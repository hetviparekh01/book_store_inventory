import mongoose, { Schema } from "mongoose";
import { IBook } from "@interfaces";
import { Author } from "@models";
import { Category } from "@models";
const BookSchema = new Schema<IBook>(
     {
          title: {
               type: String,
               required: [true, "title is required"],
          },
          author: {
               type: mongoose.Schema.Types.ObjectId,
               ref: "Author",
               required: [true, "author is required"],
          },
          category: {
               type: mongoose.Schema.Types.ObjectId,
               ref: "Category",
               required: [true, "category is required"],
          },
          ISBN: {
               type: Number,
               required: true,
          },
          description: {
               type: String,
               required: false,
          },
          price: {
               type: Number,
               required: true,
          },
     },
     {
          timestamps: true,
     }
);

BookSchema.pre("save", async function (next) {
     try {
          const author = await Author.findById(this.author);
          if (author) {
               next();
          } else {
               throw new Error("Author does not exist");
          }
     } catch (error: any) {
          next(error);
     }
});

BookSchema.pre("save", async function (next) {
     try {
          const category = await Category.findById(this.category);
          if (category) {
               next();
          } else {
               throw new Error("Category does not exist");
          }
     } catch (error: any) {
          next(error);
     }
});

const Book = mongoose.model("Book", BookSchema);

export { Book };
