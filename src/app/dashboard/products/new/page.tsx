"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  ArrowLeft,
  Loader2,
  Image as ImageIcon,
  DollarSign,
  Package,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AddProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const handleImageUrlChange = (url: string) => {
    setImagePreview(url);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      price: Number(formData.get("price")),
      description: formData.get("description"),
      imageUrl: formData.get("imageUrl"),
    };

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        router.push("/dashboard");
      } else {
        const err = await res.json();
        setError(err.error || "Failed to create product");
      }
    } catch (e) {
      setError("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4"
      >
        <Link href="/dashboard">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Add New Product</h1>
          <p className="text-muted-foreground">
            Create a new product for your store
          </p>
        </div>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle>Product Details</CardTitle>
              <CardDescription>
                Enter the information for your new product
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    Product Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    required
                    placeholder="e.g., Premium Wireless Headphones"
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price" className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Price
                  </Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    required
                    placeholder="0.00"
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    required
                    placeholder="Describe your product in detail..."
                    rows={5}
                    className="resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="imageUrl" className="flex items-center gap-2">
                    <ImageIcon className="h-4 w-4" />
                    Image URL
                  </Label>
                  <Input
                    id="imageUrl"
                    name="imageUrl"
                    placeholder="https://example.com/image.jpg"
                    className="h-11"
                    onChange={(e) => handleImageUrlChange(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter a direct link to your product image
                  </p>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="text-sm text-red-500 bg-red-50 dark:bg-red-950/50 p-3 rounded-md"
                  >
                    {error}
                  </motion.div>
                )}

                <div className="flex gap-3 pt-4">
                  <Link href="/dashboard" className="flex-1">
                    <Button
                      variant="outline"
                      type="button"
                      className="w-full h-11"
                    >
                      Cancel
                    </Button>
                  </Link>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="flex-1 h-11"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      "Create Product"
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-none shadow-lg sticky top-24">
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>
                How your product will appear in the shop
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                {imagePreview ? (
                  <div className="aspect-square relative bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      layout="fill"
                      className="object-cover w-full h-full"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                ) : (
                  <div className="aspect-square bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <ImageIcon className="h-16 w-16 mx-auto text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        No image yet
                      </p>
                    </div>
                  </div>
                )}
                <div className="p-4 bg-background">
                  <h3 className="font-semibold text-lg mb-2">Product Name</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Product description will appear here
                  </p>
                  <p className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                    $0.00
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
