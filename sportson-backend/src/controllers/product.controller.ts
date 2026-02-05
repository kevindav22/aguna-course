import fs from 'fs';
import path from 'path';
import Product from '../models/product.model';
import Category from '../models/category.model';
import { Request, Response } from 'express';
import mongoose from 'mongoose';

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  const removeFile = (file?: Express.Multer.File) => {
    if (file && fs.existsSync(file.path)) fs.unlinkSync(file.path);
  };

  try {
    const { name, description, stock, price, category } = req.body;

    if (!name || !description || stock == null || price == null || !category) {
      removeFile(req.file);
      res.status(400).json({ message: 'All fields are required' });
      return;
    }

    if (stock < 0 || price < 0) {
      removeFile(req.file);
      res.status(400).json({ message: 'Stock and price cannot be negative' });
      return;
    }

    let foundCategory;
    if (mongoose.Types.ObjectId.isValid(category)) {
      foundCategory = await Category.findById(category);
    } else {
      foundCategory = await Category.findOne({ name: category });
    }

    if (!foundCategory) {
      removeFile(req.file);
      res.status(404).json({ message: 'Category not found' });
      return;
    }

    if (!req.file) {
      res.status(400).json({ message: 'Image is required' });
      return;
    }

    const product = await Product.create({
      name,
      description,
      stock,
      price,
      category: foundCategory._id,
      imageUrl: `/uploads/${req.file.filename}`,
    });

    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    removeFile(req.file);
    res.status(500).json({ message: 'Error creating product', error });
  }
};

export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.find().populate('category').sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
};

export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.findById(req.params.id).populate('category');
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error });
  }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  const removeFile = (file?: Express.Multer.File) => {
    if (file && fs.existsSync(file.path)) fs.unlinkSync(file.path);
  };
  try {
    const { name, description, stock, price, category } = req.body;

    const existingProduct = await Product.findById(req.params.id);
    if (!existingProduct) {
      removeFile(req.file);
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    const updateData: any = {};

    if (name !== undefined) {
      if (!name.trim()) {
        removeFile(req.file);
        res.status(400).json({ message: 'Name cannot be empty' });
        return;
      }
      updateData.name = name;
    }

    if (description !== undefined) {
      if (!description.trim()) {
        removeFile(req.file);
        res.status(400).json({ message: 'Description cannot be empty' });
        return;
      }
      updateData.description = description;
    }

    if (stock !== undefined) {
      if (stock < 0) {
        removeFile(req.file);
        res.status(400).json({ message: 'Stock cannot be negative' });
        return;
      }
      updateData.stock = stock;
    }

    if (price !== undefined) {
      if (price < 0) {
        removeFile(req.file);
        res.status(400).json({ message: 'Price cannot be negative' });
        return;
      }
      updateData.price = price;
    }

    if (category !== undefined) {
      let foundCategory;

      if (mongoose.Types.ObjectId.isValid(category)) {
        foundCategory = await Category.findById(category);
      } else {
        foundCategory = await Category.findOne({ name: category });
      }

      if (!foundCategory) {
        removeFile(req.file);
        res.status(400).json({ message: 'Category not found' });
        return;
      }

      updateData.category = foundCategory._id;
    }

    if (req.file) {
      if (existingProduct.imageUrl) {
        const oldPath = path.join(process.cwd(), existingProduct.imageUrl);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      updateData.imageUrl = `/uploads/${req.file.filename}`;
    }

    const product = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.status(200).json({ message: 'Product updated successfully', product });
  } catch (error) {
    removeFile(req.file);
    res.status(500).json({ message: 'Error updating product', error });
  }
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    if (product.imageUrl) {
      const imagePath = path.join(process.cwd(), product.imageUrl);

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error });
  }
};
