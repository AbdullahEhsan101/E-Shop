import { Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/ui/logo";
import connectDB from "@/lib/db";
import Product from "@/models/Product";
import { ShoppingCart, Heart, Search, Star, TrendingUp } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

export const dynamic = "force-dynamic";

async function getProducts() {
  await connectDB();
  const products = await Product.find({}).sort({ createdAt: -1 });
  return JSON.parse(JSON.stringify(products));
}

async function ProductGrid() {
  const products = await getProducts();

  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-4">
          <ShoppingCart className="w-10 h-10 text-muted-foreground" />
        </div>
        <h3 className="text-2xl font-semibold mb-2">No products available</h3>
        <p className="text-muted-foreground">
          Check back later for amazing deals!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product: any, index: number) => (
        <Card
          key={product._id}
          className="group relative overflow-hidden border-0 bg-card shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
        >
          {index === 0 && (
            <Badge className="absolute top-4 left-4 z-10 bg-gradient-to-r from-amber-500 to-orange-600 border-0 shadow-lg">
              <TrendingUp className="w-3 h-3 mr-1" />
              Trending
            </Badge>
          )}

          <div className="relative overflow-hidden">
            {product.imageUrl ? (
              <div className="aspect-square relative bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                <Image
                  src={product.imageUrl ??''}
                  alt={product.name}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 ease-out"
                  fill
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                  <Button
                    size="icon"
                    variant="secondary"
                    className="h-9 w-9 rounded-full shadow-lg backdrop-blur-sm bg-white/90 hover:bg-white dark:bg-gray-900/90 dark:hover:bg-gray-900 hover:scale-110 transition-all"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="h-9 w-9 rounded-full shadow-lg backdrop-blur-sm bg-white/90 hover:bg-white dark:bg-gray-900/90 dark:hover:bg-gray-900 hover:scale-110 transition-all"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
                <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-semibold">4.8</span>
                </div>
              </div>
            ) : (
              <div className="aspect-square bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/10 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-white/10" />
                <ShoppingCart className="w-12 h-12 text-muted-foreground relative z-10" />
              </div>
            )}
          </div>

          <CardContent className="p-4 space-y-2">
            <Badge variant="outline" className="text-xs font-medium">
              Fashion
            </Badge>

            <h3 className="font-semibold text-base leading-tight line-clamp-1 group-hover:text-primary transition-colors">
              {product.name}
            </h3>

            <p className="text-sm text-muted-foreground line-clamp-2">
              {product.description}
            </p>

            <div className="flex items-center justify-between pt-1">
              <p className="text-xl font-bold text-foreground">
                ${product.price.toFixed(2)}
              </p>
              <p className="text-xs font-medium text-green-600 dark:text-green-400">
                In Stock
              </p>
            </div>
          </CardContent>
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
        </Card>
      ))}
    </div>
  );
}

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      {/* Hero Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
        <div className="container flex h-16 items-center justify-between px-4 md:px-8 max-w-7xl mx-auto">
          <Logo />
          <nav className="flex items-center gap-4">
            <Link href="/login">
              <Button
                size="sm"
                className="shadow-md hover:shadow-lg transition-shadow"
              >
                Go to dashboard
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5" />
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(white,transparent_85%)]" />
        <div className="container relative px-4 md:px-8 py-20 md:py-28 max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-6 text-sm px-4 py-1.5" variant="outline">
              New Collection 2025
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
              Discover Your Style
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Explore our curated collection of premium products. Quality
              guaranteed, style perfected, delivered to your door.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                size="lg"
                className="shadow-xl hover:shadow-2xl transition-all text-base px-8"
                asChild
              >
                <a href="#products">Shop products</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <main
        id="products"
        className="container px-4 md:px-8 py-16 md:py-20 max-w-7xl mx-auto"
      >
        <div className="mb-12 text-center md:text-left">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-1 w-12 bg-gradient-to-r from-primary to-purple-600 rounded-full" />
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">
              Featured
            </span>
          </div>
          <h2 className="text-4xl font-bold tracking-tight mb-3">
            Premium Collection
          </h2>
          <p className="text-muted-foreground text-lg">
            Handpicked items crafted with excellence
          </p>
        </div>
        <Suspense fallback={<ProductGridSkeleton />}>
          <ProductGrid />
        </Suspense>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30 mt-24">
        <div className="container px-4 md:px-8 py-16 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="space-y-4">
              <Logo />
              <p className="text-sm text-muted-foreground leading-relaxed">
                Your trusted destination for premium quality products and
                exceptional service.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-lg">Shop</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    All Products
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    New Arrivals
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Best Sellers
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Sale
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-lg">Support</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Shipping Info
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Returns
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-lg">Company</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/login"
                    className="hover:text-foreground transition-colors"
                  >
                    Admin Portal
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; 2025 E-Shop. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link
                href="#"
                className="hover:text-foreground transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="hover:text-foreground transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                className="hover:text-foreground transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <Card key={i} className="overflow-hidden border-0 shadow-lg">
          <Skeleton className="aspect-square w-full" />
          <CardContent className="p-4 space-y-3">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <div className="flex justify-between pt-2">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-20" />
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Skeleton className="h-10 w-full" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
