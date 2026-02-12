import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import Transaction from '../models/transaction.model';
import Product from '../models/product.model';
export const createTransaction = async (req: Request, res: Response): Promise<void> => {
  const removeFile = (file?: Express.Multer.File) => {
    if (file && fs.existsSync(file.path)) fs.unlinkSync(file.path);
  };

  try {
    const { purchasedItems, customerName, customerContact, customerAddress } = req.body;

    if (!purchasedItems || !customerName || !customerContact || !customerAddress) {
      removeFile(req.file);
      res.status(400).json({ message: 'All fields are required' });
      return;
    }

    if (!req.file) {
      res.status(400).json({ message: 'Payment proof is required' });
      return;
    }

    let parsedItems: { productId: string; qty: number }[];
    if (typeof purchasedItems === 'string') {
      try {
        parsedItems = JSON.parse(purchasedItems);
      } catch {
        removeFile(req.file);
        res.status(400).json({ message: 'Invalid purchasedItems format' });
        return;
      }
    } else {
      parsedItems = purchasedItems;
    }

    let totalPayment = 0;

    for (const item of parsedItems) {
      const product = await Product.findById(item.productId);

      if (!product) {
        removeFile(req.file);
        res.status(404).json({ message: `Product not found: ${item.productId}` });
        return;
      }

      if (item.qty <= 0) {
        removeFile(req.file);
        res.status(400).json({ message: 'Quantity must be at least 1' });
        return;
      }

      totalPayment += product.price * item.qty;
    }
    
    const transaction = await Transaction.create({
      purchasedItems: parsedItems,
      totalPayment,
      customerName,
      customerContact,
      customerAddress,
      paymentProof: `/uploads/${req.file.filename}`,
      status: 'pending',
    });

    res.status(201).json({
      message: 'Transaction created successfully',
      transaction,
    });
  } catch (error) {
    removeFile(req.file);
    res.status(500).json({ message: 'Error creating transaction', error });
  }
};

export const getTransactions = async (req: Request, res: Response): Promise<void> => {
  try {
    const transactions = await Transaction.find().sort({ createdAt: -1 }).populate('purchasedItems.productId');
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching transactions', error });
  }
};

export const getTransactionById = async (req: Request, res: Response): Promise<void> => {
  try {
    const transaction = await Transaction.findById(req.params.id).populate('purchasedItems.productId');
    if (!transaction) {
      res.status(404).json({ message: 'Transaction not found' });
      return;
    }
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching transaction', error });
  }
};

export const updateTransaction = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status } = req.body;

    const existingTransaction = await Transaction.findById(req.params.id);
    if (!existingTransaction) {
      res.status(404).json({ message: 'Transaction not found' });
      return;
    }
    if (status === 'paid' && existingTransaction.status !== 'paid') {
      for (const item of existingTransaction.purchasedItems) {
        await Product.findByIdAndUpdate(item.productId, { $inc: { stock: -item.qty } });
      }
    }

    const transaction = await Transaction.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!transaction) {
      res.status(404).json({ message: 'Transaction not found' });
      return;
    }
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ message: 'Error updating transaction', error });
  }
};
