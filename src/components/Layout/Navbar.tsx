
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "py-2 bg-background/80 backdrop-blur-md shadow-sm" : "py-4"
      }`}
    >
      <div className="container px-4 mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-kappa-600 to-kappa-500 bg-clip-text text-transparent">
            κappa
          </span>
          <span className="font-medium">AI Visualizer</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="font-medium hover:text-kappa-600 transition-colors">
            Home
          </Link>
          <Link to="/visualize" className="font-medium hover:text-kappa-600 transition-colors">
            Visualize
          </Link>
          <Link to="/about" className="font-medium hover:text-kappa-600 transition-colors">
            About
          </Link>
          <div className="ml-4 flex items-center gap-3">
            <ThemeToggle />
            <Button className="bg-kappa-600 hover:bg-kappa-700 transition-colors">
              Get Started
            </Button>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav
        className={`md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md transition-all duration-300 shadow-lg ${
          isMenuOpen ? "max-h-screen py-4" : "max-h-0 py-0 overflow-hidden"
        }`}
      >
        <div className="container px-4 mx-auto flex flex-col gap-4">
          <Link
            to="/"
            className="py-2 font-medium hover:text-kappa-600 transition-colors"
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link
            to="/visualize"
            className="py-2 font-medium hover:text-kappa-600 transition-colors"
            onClick={toggleMenu}
          >
            Visualize
          </Link>
          <Link
            to="/about"
            className="py-2 font-medium hover:text-kappa-600 transition-colors"
            onClick={toggleMenu}
          >
            About
          </Link>
          <Button className="w-full mt-2 bg-kappa-600 hover:bg-kappa-700 transition-colors">
            Get Started
          </Button>
        </div>
      </nav>
    </header>
  );
};
