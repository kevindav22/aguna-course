import fs from 'fs';
import path from 'path';
import { Request, Response } from 'express';
import Category from '../models/category.model';

export const createCategory = async (req: Request, res: Response): Promise<void> => {
  const removeFile = (file?: Express.Multer.File) => {
    if (file && fs.existsSync(file.path)) fs.unlinkSync(file.path);
  };

  try {
    const { name, description } = req.body;

    if (!name || !description )  {
      removeFile(req.file);
      res.status(400).json({ message: 'All fields are required' });
      return;
    }

    if (!req.file) {
      res.status(400).json({ message: 'Image is required' });
      return;
    }

    const exists = await Category.findOne({ name });

    if (exists) {
      removeFile(req.file);
      res.status(400).json({ message: 'Category already exists' });
      return;
    }

    const category = await Category.create({
      name: name,
      description,
      imageUrl: `/uploads/${req.file.filename}`,
    });

    res.status(201).json({ message: 'Category created successfully', category });
  } catch (error) {
    removeFile(req.file);
    res.status(500).json({ message: 'Error creating Category', error });
  }
};

export const getCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories', error });
  }
};

export const getCategoryById = async (req: Request, res: Response): Promise<void> => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching category', error });
  }
};

export const updateCategory = async (req: Request, res: Response): Promise<void> => {
  const removeFile = (file?: Express.Multer.File) => {
    if (file && fs.existsSync(file.path)) fs.unlinkSync(file.path);
  };
  try {
    const { name, description } = req.body;

    const existingProduct = await Category.findById(req.params.id);
    if (!existingProduct) {
      removeFile(req.file);
      res.status(404).json({ message: 'Category not found' });
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

    if (req.file) {
      if (existingProduct.imageUrl) {
        const oldPath = path.join(process.cwd(), existingProduct.imageUrl);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      updateData.imageUrl = `/uploads/${req.file.filename}`;
    }

    const category = await Category.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.status(200).json({ message: 'Category updated successfully', category });
  } catch (error) {
    res.status(500).json({ message: 'Error updating category', error });
  }
};

export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      res.status(400).json({ message: 'Category not found' });
      return;
    }

    if (category.imageUrl) {
      const imagePath = path.join(process.cwd(), category.imageUrl);

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    await Category.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting category', error });
  }
};
