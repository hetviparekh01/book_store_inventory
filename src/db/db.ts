import mongoose from "mongoose";
import config from "config";
import express from "express";

const url: string = config.get("url");

export const connectDB = () => {
     return mongoose.connect(url);
};
