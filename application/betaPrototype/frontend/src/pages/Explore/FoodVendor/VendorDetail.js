import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../ExploreTemplate.css";
import { FaStar, FaCommentDots } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { getVendorData, postVendorReview } from "../../../services/Explore/exploreService";

const vendorsInfo = {
  "Cafe 101": {
    location: "Cesar Chavez Student, Plaza Level",
    schedule: {
      Monday: "07:30 am - 04:00 pm",
      Tuesday: "07:30 am - 04:00 pm",
      Wednesday: "07:30 am - 04:00 pm",
      Thursday: "07:30 am - 04:00 pm",
      Friday: "07:30 am - 02:30 pm",
      Saturday: "CLOSED",
      Sunday: "CLOSED",
    },
    menu: [
      { name: "House Coffee", price: "$2.50" },
      { name: "Matcha Green Latte", price: "$4.05" },
      { name: "Thai Tea Latte", price: "$4.05" },
      { name: "Hot Chocolate", price: "$3.65" },
      { name: "Espresso", price: "$2.60" },
      { name: "Cappuccino", price: "$3.55" },
      { name: "Americano", price: "$2.75" },
      { name: "Cafe Mocha", price: "$4.45" },
      { name: "Gator", price: "$4.45" },
      { name: "Tuxedo Mocha", price: "$4.45" },
      { name: "White Mocha", price: "$4.45" },
      { name: "Vanilla Cream Latte", price: "$4.45" },
    ],
  },
  "Cafe Rosso": {
    location: "Centennial Walkway (behind Burk Hall)",
    schedule: {
      Monday: "07:00 am - 05:00 pm",
      Tuesday: "07:00 am - 05:00 pm",
      Wednesday: "07:00 am - 05:00 pm",
      Thursday: "07:00 am - 05:00 pm",
      Friday: "07:00 am - 03:00 pm",
      Saturday: "CLOSED",
      Sunday: "CLOSED",
    },
    menu: [
      { name: "Espresso", price: "$2.50" },
      { name: "Cappuccino", price: "$3.75" },
      { name: "Latte", price: "$4.00" },
      { name: "Americano", price: "$2.75" },
      { name: "Macchiato", price: "$3.00" },
      { name: "Mocha", price: "$4.25" },
      { name: "Affogato", price: "$4.50" },
      { name: "Flat White", price: "$4.25" },
      { name: "Iced Coffee", price: "$3.50" },
      { name: "Chai Latte", price: "$4.25" },
      { name: "Turkish Coffee", price: "$3.75" },
      { name: "Irish Coffee", price: "$5.00" },
    ],
  },
  "City Cafe": {
    location: "Cesar Student Center, West Plaza",
    schedule: {
      Monday: "10:00 am - 04:30 pm",
      Tuesday: "10:00 am - 04:30 pm",
      Wednesday: "10:00 am - 04:30 pm",
      Thursday: "10:00 am - 04:30 pm",
      Friday: "10:00 am - 03:00 pm",
      Saturday: "CLOSED",
      Sunday: "CLOSED",
    },
    menu: [
      { name: "Classic Burger", price: "$9.99" },
      { name: "Grilled Chicken Sandwich", price: "$8.99" },
      { name: "Caesar Salad", price: "$7.99" },
      { name: "Margherita Pizza", price: "$10.99" },
      { name: "Pasta Alfredo", price: "$11.99" },
      { name: "Fish and Chips", price: "$12.99" },
      { name: "Club Sandwich", price: "$9.99" },
      { name: "Steak Frites", price: "$15.99" },
      { name: "Vegetable Stir Fry", price: "$10.99" },
      { name: "Soup of the Day", price: "$4.99" },
      { name: "Cheesecake", price: "$5.99" },
      { name: "Fruit Tart", price: "$4.99" },
    ],
  },
  "Clean Bites": {
    location: "Mashouf Wellness Center",
    schedule: {
      Monday: "11:00 am - 06:00 pm",
      Tuesday: "11:00 am - 06:00 pm",
      Wednesday: "11:00 am - 06:00 pm",
      Thursday: "11:00 am - 06:00 pm",
      Friday: "11:00 am - 04:00 pm",
      Saturday: "CLOSED",
      Sunday: "CLOSED",
    },
    menu: [
      { name: "Quinoa Salad", price: "$8.99" },
      { name: "Avocado Toast", price: "$6.99" },
      { name: "Grilled Vegetable Wrap", price: "$9.99" },
      { name: "Acai Bowl", price: "$7.99" },
      { name: "Green Smoothie", price: "$5.99" },
      { name: "Veggie Burger", price: "$10.99" },
      { name: "Hummus Platter", price: "$8.99" },
      { name: "Vegetable Sushi Roll", price: "$9.99" },
      { name: "Quinoa Bowl", price: "$10.99" },
      { name: "Kale Caesar Salad", price: "$7.99" },
      { name: "Chia Pudding", price: "$4.99" },
      { name: "Fruit Salad", price: "$6.99" },
    ],
  },
  "Farm Fresh Underground": {
    location: "Cesar Chavez Student Center, Lower Conference Level",
    schedule: {
      Monday: "10:00 am - 03:00 pm",
      Tuesday: "10:00 am - 03:00 pm",
      Wednesday: "10:00 am - 03:00 pm",
      Thursday: "10:00 am - 03:00 pm",
      Friday: "CLOSED",
      Saturday: "CLOSED",
      Sunday: "CLOSED",
    },
    menu: [
      { name: "Farmers Market Salad", price: "$9.99" },
      { name: "Roasted Vegetable Panini", price: "$8.99" },
      { name: "Spinach and Goat Cheese Omelette", price: "$10.99" },
      { name: "Quinoa Buddha Bowl", price: "$11.99" },
      { name: "Sweet Potato and Black Bean Tacos", price: "$9.99" },
      { name: "Seasonal Fruit Smoothie", price: "$6.99" },
      { name: "Vegetable Stir-Fry", price: "$10.99" },
      { name: "Grilled Portobello Mushroom Burger", price: "$9.99" },
      { name: "Kale Caesar Salad", price: "$8.99" },
      { name: "Farmhouse Breakfast Platter", price: "$12.99" },
      { name: "Zucchini Noodles with Pesto", price: "$10.99" },
      { name: "Coconut Chia Pudding", price: "$5.99" },
    ],
  },
  "Gold Coast Grill & Catering": {
    location: "Cesar Chavez Student Center, Plaza Level",
    schedule: {
      Monday: "08:00 am - 04:00 pm",
      Tuesday: "08:00 am - 04:00 pm",
      Wednesday: "08:00 am - 04:00 pm",
      Thursday: "08:00 am - 04:00 pm",
      Friday: "08:00 am - 02:00 pm",
      Saturday: "CLOSED",
      Sunday: "CLOSED",
    },
    menu: [
      { name: "Grilled Salmon", price: "$15.99" },
      { name: "New York Strip Steak", price: "$19.99" },
      { name: "Chicken Parmesan", price: "$14.99" },
      { name: "Vegetable Lasagna", price: "$12.99" },
      { name: "Shrimp Scampi", price: "$16.99" },
      { name: "BBQ Pulled Pork Sandwich", price: "$11.99" },
      { name: "Caesar Salad with Grilled Chicken", price: "$10.99" },
      { name: "Vegetarian Wrap", price: "$9.99" },
      { name: "Mushroom Risotto", price: "$13.99" },
      { name: "Caprese Panini", price: "$8.99" },
      { name: "Grilled Vegetable Platter", price: "$12.99" },
      { name: "Tiramisu", price: "$6.99" },
    ],
  },
  "Good to Go": {
    location: "Village at Centennial Square",
    schedule: {
      Monday: "ClOSED",
      Tuesday: "ClOSED",
      Wednesday: "ClOSED",
      Thursday: "ClOSED",
      Friday: "ClOSED",
      Saturday: "CLOSED",
      Sunday: "CLOSED",
    },
    menu: [
      { name: "Classic Cheeseburger", price: "$9.99" },
      { name: "Grilled Chicken Caesar Wrap", price: "$8.99" },
      { name: "Vegetarian Buddha Bowl", price: "$10.99" },
      { name: "Mushroom Swiss Burger", price: "$10.99" },
      { name: "Avocado Toast", price: "$7.99" },
      { name: "Turkey Club Sandwich", price: "$9.99" },
      { name: "Caprese Salad", price: "$8.99" },
      { name: "Fish Tacos", price: "$11.99" },
      { name: "Pesto Pasta", price: "$10.99" },
      { name: "Greek Salad", price: "$8.99" },
      { name: "Chocolate Chip Cookie", price: "$2.99" },
      { name: "Fresh Fruit Smoothie", price: "$5.99" },
    ],
  },
  "Halal Shop": {
    location: "Cesar Chavez Student Center, West Plaza",
    schedule: {
      Monday: "09:00 am - 06:00 pm",
      Tuesday: "09:00 am - 06:00 pm",
      Wednesday: "09:00 am - 06:00 pm",
      Thursday: "09:00 am - 06:00 pm",
      Friday: "09:00 am - 06:00 pm",
      Saturday: "CLOSED",
      Sunday: "CLOSED",
    },
    menu: [
      { name: "Chicken Shawarma Platter", price: "$10.99" },
      { name: "Beef Kebab Wrap", price: "$8.99" },
      { name: "Falafel Sandwich", price: "$7.99" },
      { name: "Lamb Curry with Rice", price: "$11.99" },
      { name: "Vegetable Samosas (4 pieces)", price: "$4.99" },
      { name: "Hummus and Pita", price: "$5.99" },
      { name: "Mixed Grill Platter", price: "$14.99" },
      { name: "Chicken Biryani", price: "$9.99" },
      { name: "Vegetable Curry", price: "$8.99" },
      { name: "Baklava", price: "$3.99" },
      { name: "Mango Lassi", price: "$3.99" },
      { name: "Turkish Coffee", price: "$2.99" },
    ],
  },
  "HSS 121 Cafe": {
    location: "1st floor of Health & Social Sciences Building, HSS 121",
    schedule: {
      Monday: "08:00 am - 03:00 pm",
      Tuesday: "08:00 am - 03:00 pm",
      Wednesday: "08:00 am - 03:00 pm",
      Thursday: "08:00 am - 03:00 pm",
      Friday: "ClOSED",
      Saturday: "CLOSED",
      Sunday: "CLOSED",
    },
    menu: [
      { name: "HSS Signature Burger", price: "$9.99" },
      { name: "Grilled Chicken Panini", price: "$8.99" },
      { name: "Vegetarian Wrap", price: "$7.99" },
      { name: "Classic Caesar Salad", price: "$6.99" },
      { name: "Turkey and Avocado Sandwich", price: "$8.99" },
      { name: "Caprese Panini", price: "$7.99" },
      { name: "Quinoa Salad", price: "$7.99" },
      { name: "Chicken Caesar Wrap", price: "$8.99" },
      { name: "Mediterranean Veggie Bowl", price: "$9.99" },
      { name: "Fruit Parfait", price: "$4.99" },
      { name: "Chocolate Brownie", price: "$3.99" },
      { name: "Iced Latte", price: "$4.99" },
    ],
  },
  "Natural Sensations": {
    location: "Cesar Chavez Student Center, Plaza Level",
    schedule: {
      Monday: "08:00 am - 04:00 pm",
      Tuesday: "08:00 am - 04:00 pm",
      Wednesday: "08:00 am - 04:00 pm",
      Thursday: "08:00 am - 04:00 pm",
      Friday: "08:00 am - 02:30 pm",
      Saturday: "CLOSED",
      Sunday: "CLOSED",
    },
    menu: [
      { name: "Organic Kale Salad", price: "$8.99" },
      { name: "Acai Bowl", price: "$9.99" },
      { name: "Quinoa Avocado Wrap", price: "$10.99" },
      { name: "Vegan Buddha Bowl", price: "$11.99" },
      { name: "Green Detox Smoothie", price: "$6.99" },
      { name: "Vegetable Stir-Fry", price: "$9.99" },
      { name: "Chia Seed Pudding", price: "$5.99" },
      { name: "Coconut Curry Tofu", price: "$12.99" },
      { name: "Grilled Portobello Burger", price: "$10.99" },
      { name: "Fruit Salad", price: "$7.99" },
      { name: "Almond Butter Toast", price: "$4.99" },
      { name: "Turmeric Latte", price: "$4.99" },
    ],
  },
  "Nizario's Pizza": {
    location: "Cesar Chavez Studnet Center, Recreation & Dining Level",
    schedule: {
      Monday: "10:00 am - 06:00 pm",
      Tuesday: "10:00 am - 06:00 pm",
      Wednesday: "10:00 am - 06:00 pm",
      Thursday: "10:00 am - 06:00 pm",
      Friday: "10:00 am - 06:00 pm",
      Saturday: "CLOSED",
      Sunday: "CLOSED",
    },
    menu: [
      { name: "Margherita Pizza", price: "$10.99" },
      { name: "Pepperoni Pizza", price: "$12.99" },
      { name: "Vegetarian Pizza", price: "$11.99" },
      { name: "Supreme Pizza", price: "$13.99" },
      { name: "BBQ Chicken Pizza", price: "$12.99" },
      { name: "Hawaiian Pizza", price: "$11.99" },
      { name: "Buffalo Chicken Pizza", price: "$13.99" },
      { name: "Meat Lovers Pizza", price: "$14.99" },
      { name: "Veggie Delight Pizza", price: "$12.99" },
      { name: "Mushroom and Spinach Pizza", price: "$11.99" },
      { name: "Garlic Knots (6 pieces)", price: "$4.99" },
      { name: "Cheesy Breadsticks", price: "$6.99" },
    ],
  },
  "Peet's Coffee & Tea": {
    location: "First Floor of the J. Paul Leonard Library",
    schedule: {
      Monday: "07:00 am - 08:00 pm",
      Tuesday: "07:00 am - 08:00 pm",
      Wednesday: "07:00 am - 08:00 pm",
      Thursday: "07:00 am - 08:00 pm",
      Friday: "07:00 am - 04:00 pm",
      Saturday: "CLOSED",
      Sunday: "CLOSED",
    },
    menu: [
      { name: "House Blend Coffee", price: "$2.50" },
      { name: "English Breakfast Tea", price: "$3.00" },
      { name: "Caffe Latte", price: "$4.25" },
      { name: "Chai Latte", price: "$4.50" },
      { name: "Espresso", price: "$2.75" },
      { name: "Cappuccino", price: "$4.00" },
      { name: "Mocha", price: "$4.75" },
      { name: "Cold Brew Coffee", price: "$3.50" },
      { name: "Iced Tea", price: "$3.25" },
      { name: "Matcha Green Tea Latte", price: "$4.75" },
      { name: "Americano", price: "$3.00" },
      { name: "Macchiato", price: "$3.75" },
    ],
  },
  Quickly: {
    location: "Cesar Chavez Student Center, West Plaza",
    schedule: {
      Monday: "10:00 am - 05:30 pm",
      Tuesday: "10:00 am - 05:30 pm",
      Wednesday: "10:00 am - 05:30 pm",
      Thursday: "10:00 am - 05:30 pm",
      Friday: "10:00 am - 05:00 pm",
      Saturday: "CLOSED",
      Sunday: "CLOSED",
    },
    menu: [
      { name: "Bubble Milk Tea", price: "$4.50" },
      { name: "Taro Milk Tea", price: "$4.75" },
      { name: "Matcha Latte", price: "$4.25" },
      { name: "Mango Smoothie", price: "$5.00" },
      { name: "Honey Green Tea", price: "$3.75" },
      { name: "Grass Jelly Milk Tea", price: "$4.50" },
      { name: "Passionfruit Green Tea", price: "$4.25" },
      { name: "Red Bean Ice Blend", price: "$5.25" },
      { name: "Lychee Black Tea", price: "$4.00" },
      { name: "Strawberry Slush", price: "$5.00" },
      { name: "Coconut Milk Tea", price: "$4.50" },
      { name: "Milk Cap Oolong Tea", price: "$4.75" },
    ],
  },
  "Station Cafe": {
    location: "19th Avenue (in front of HSS Building)",
    schedule: {
      Monday: "07:00 am - 05:00 pm",
      Tuesday: "07:00 am - 05:00 pm",
      Wednesday: "07:00 am - 05:00 pm",
      Thursday: "07:00 am - 05:00 pm",
      Friday: "07:00 am - 03:00 pm",
      Saturday: "CLOSED",
      Sunday: "CLOSED",
    },
    menu: [
      { name: "Station Breakfast Sandwich", price: "$8.99" },
      { name: "Avocado Toast", price: "$7.99" },
      { name: "Classic Pancakes", price: "$9.99" },
      { name: "Egg and Cheese Bagel", price: "$6.99" },
      { name: "French Toast", price: "$8.99" },
      { name: "Vegetarian Omelette", price: "$10.99" },
      { name: "Greek Yogurt Parfait", price: "$5.99" },
      { name: "Smoked Salmon Bagel", price: "$12.99" },
      { name: "Chicken Caesar Wrap", price: "$9.99" },
      { name: "Grilled Cheese Sandwich", price: "$7.99" },
      { name: "Fruit Salad", price: "$6.99" },
      { name: "Iced Coffee", price: "$3.99" },
    ],
  },
  Subway: {
    location: "Village at Centennial Square",
    schedule: {
      Monday: "07:00 am - 11:00 pm",
      Tuesday: "07:00 am - 11:00 pm",
      Wednesday: "07:00 am - 11:00 pm",
      Thursday: "07:00 am - 11:00 pm",
      Friday: "09:00 am - 09:00 pm",
      Saturday: "CLOSED",
      Sunday: "CLOSED",
    },
    menu: [
      { name: "6-inch Veggie Delight", price: "$5.49" },
      { name: "6-inch Turkey Breast", price: "$6.29" },
      { name: "6-inch Italian B.M.T.", price: "$6.99" },
      { name: "6-inch Spicy Italian", price: "$6.29" },
      { name: "6-inch Meatball Marinara", price: "$6.29" },
      { name: "6-inch Subway Club", price: "$6.99" },
      { name: "6-inch Roast Beef", price: "$6.99" },
      { name: "6-inch Tuna", price: "$6.99" },
      { name: "6-inch Cold Cut Combo", price: "$5.99" },
      { name: "6-inch Steak and Cheese", price: "$7.49" },
      { name: "6-inch Chicken Teriyaki", price: "$7.29" },
      { name: "6-inch Chicken & Bacon Ranch Melt", price: "$7.99" },
      { name: "6-inch Subway Melt", price: "$6.99" },
      { name: "6-inch Buffalo Chicken", price: "$7.29" },
      { name: "6-inch Black Forest Ham", price: "$5.99" },
      { name: "Cookies (3 pieces)", price: "$2.99" },
      { name: "Chips", price: "$1.29" },
      { name: "Soda", price: "$1.99" },
      { name: "Bottled Water", price: "$1.49" },
      { name: "Salads", price: "$6.99" },
    ],
  },
  "Taqueria Girasol": {
    location: "Cesar Chavez Student Center, Plaza Level",
    schedule: {
      Monday: "08:00 am - 04:00 pm",
      Tuesday: "08:00 am - 04:00 pm",
      Wednesday: "08:00 am - 04:00 pm",
      Thursday: "08:00 am - 04:00 pm",
      Friday: "08:00 am - 02:00 pm",
      Saturday: "CLOSED",
      Sunday: "CLOSED",
    },
    menu: [
      { name: "Tacos al Pastor", price: "$2.99" },
      { name: "Carne Asada Burrito", price: "$8.99" },
      { name: "Quesadilla de Pollo", price: "$6.99" },
      { name: "Enchiladas Verdes", price: "$7.99" },
      { name: "Chiles Rellenos", price: "$9.99" },
      { name: "Guacamole and Chips", price: "$4.99" },
      { name: "Tamales", price: "$3.99" },
      { name: "Fajitas de Camarones", price: "$11.99" },
      { name: "Ceviche", price: "$8.99" },
      { name: "Horchata", price: "$2.50" },
      { name: "Margarita", price: "$6.99" },
      { name: "Mexican Coke", price: "$2.99" },
    ],
  },
  "Taza Smoothies & Wraps": {
    location: "Village at Centennial Square",
    schedule: {
      Monday: "09:00 am - 04:00 pm",
      Tuesday: "09:00 am - 04:00 pm",
      Wednesday: "09:00 am - 04:00 pm",
      Thursday: "09:00 am - 04:00 pm",
      Friday: "09:00 am - 03:00 pm",
      Saturday: "CLOSED",
      Sunday: "CLOSED",
    },
    menu: [
      { name: "Tropical Paradise Smoothie", price: "$6.99" },
      { name: "Berry Blast Smoothie", price: "$5.99" },
      { name: "Green Goddess Smoothie", price: "$7.49" },
      { name: "Mango Tango Smoothie", price: "$6.49" },
      { name: "Pineapple Punch Smoothie", price: "$5.99" },
      { name: "Strawberry Sunrise Smoothie", price: "$6.99" },
      { name: "Acai Energy Bowl", price: "$8.99" },
      { name: "Peach Perfection Smoothie", price: "$6.49" },
      { name: "Watermelon Wave Smoothie", price: "$5.99" },
      { name: "Chocolate Dream Smoothie", price: "$6.99" },
      { name: "Coconut Cream Smoothie", price: "$7.49" },
      { name: "Papaya Passion Smoothie", price: "$6.49" },
      { name: "Chicken Caesar Wrap", price: "$9.99" },
      { name: "Veggie Delight Wrap", price: "$8.99" },
      { name: "Turkey Club Wrap", price: "$9.49" },
      { name: "Greek Gyro Wrap", price: "$10.49" },
      { name: "Buffalo Chicken Wrap", price: "$9.99" },
      { name: "Avocado and Hummus Wrap", price: "$8.99" },
    ],
  },
  "The Pub at SFSU": {
    location: "Cesar Chavez Student Center, Lower Conference Level",
    schedule: {
      Monday: "12:00 am - 05:00 pm",
      Tuesday: "12:00 am - 07:00 pm",
      Wednesday: "12:00 am - 07:00 pm",
      Thursday: "12:00 am - 07:00 pm",
      Friday: "CLOSED",
      Saturday: "CLOSED",
      Sunday: "CLOSED",
    },
    menu: [
      { name: "Classic Pub Burger", price: "$10.99" },
      { name: "Fish and Chips", price: "$12.99" },
      { name: "Chicken Wings (12 pieces)", price: "$11.99" },
      { name: "Vegetarian Nachos", price: "$9.99" },
      { name: "Buffalo Chicken Wrap", price: "$10.99" },
      { name: "Caesar Salad", price: "$8.99" },
      { name: "Cheese Pizza", price: "$11.99" },
      { name: "BBQ Pulled Pork Sandwich", price: "$10.99" },
      { name: "Grilled Cheese with Tomato Soup", price: "$9.99" },
      { name: "Chicken Quesadilla", price: "$10.99" },
      { name: "Fries", price: "$4.99" },
      { name: "Onion Rings", price: "$5.99" },
      { name: "Garlic Parmesan Fries", price: "$6.99" },
      { name: "Mozzarella Sticks", price: "$7.99" },
      { name: "Beer-Battered Onion Rings", price: "$6.99" },
      { name: "Chicken Caesar Wrap", price: "$9.99" },
    ],
  },
  "Village Market & Pizza": {
    location: "Village at Centennial Square",
    schedule: {
      Monday: "10:00 am - 11:00 pm",
      Tuesday: "10:00 am - 11:00 pm",
      Wednesday: "10:00 am - 11:00 pm",
      Thursday: "10:00 am - 11:00 pm",
      Friday: "10:00 am - 11:00 pm",
      Saturday: "10:00 am - 11:00 pm",
      Sunday: "11:00 am - 11:00 pm",
    },
    menu: [
      { name: "Margherita Pizza", price: "$10.99" },
      { name: "Pepperoni Pizza", price: "$12.99" },
      { name: "Vegetarian Pizza", price: "$11.99" },
      { name: "Hawaiian Pizza", price: "$12.99" },
      { name: "Supreme Pizza", price: "$13.99" },
      { name: "BBQ Chicken Pizza", price: "$12.99" },
      { name: "Mushroom and Olive Pizza", price: "$11.99" },
      { name: "Greek Pizza", price: "$12.99" },
      { name: "Buffalo Chicken Pizza", price: "$13.99" },
      { name: "Village Special Pizza", price: "$14.99" },
      { name: "Garlic Knots (6 pieces)", price: "$4.99" },
      { name: "Cheese Breadsticks", price: "$6.99" },
      { name: "Caesar Salad", price: "$8.99" },
      { name: "Mozzarella Sticks", price: "$7.99" },
      { name: "Buffalo Wings (12 pieces)", price: "$10.99" },
    ],
  },
};

function VendorDetail() {
  const location = useLocation();
  const vendorFromState = location.state?.vendor;

  let { name } = useParams();
  name = decodeURIComponent(name.replace(/-/g, " "));
  const navigate = useNavigate();
  const vendor = { ...vendorsInfo[name], ...vendorFromState };

  const [menuItems, setMenuItems] = useState([]);
  const [menuName, setMenuName] = useState("");
  const [menuRating, setMenuRating] = useState("");
  const [menuReview, setMenuReview] = useState("");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getVendorData(name);
        setMenuItems(data);
      } catch (error) {
        console.error("Fetch Error:", error);
      }
    }
    fetchData();
  }, [name]);

  if (!vendor) {
    return <div>Loading vendor details...</div>;
  }

  const handleSearchChange = (e) => {
    setSearchText(e.target.value.toLowerCase());
  };

  const filteredItems = menuItems.filter((item) =>
    item.menu_name.toLowerCase().includes(searchText)
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = {
      vendor_name: name,
      menu_name: menuName,
      menu_rating: menuRating,
      menu_review: menuReview,
    };

    try {
      const data = await postVendorReview(postData);
      setMenuItems([...menuItems, postData]);
      navigate("/explore/foodVendor");

    } catch (error) {
      console.error("Submit Error:", error);
    }
  };

  const handleBack = () => {
    navigate("/explore/foodVendor");
  };

  const handleReviewChange = (event) => {
    const newText = event.target.value;
    // Limit the review to 100 characters
    if (newText.length <= 100) {
      setMenuReview(newText);
    }
  };

  return (
    <div className="content-wrapper">
      <div className="search-wrapper">
        <div className="button-and-name">
          <h2 style={{ color: "white" }}>FOOD VENDORS</h2>
          <button onClick={handleBack} className="go-back-button">
            GO BACK
          </button>
        </div>
        <p
          style={{
            color: "gray",
            fontSize: "14px",
            marginTop: "10px",
            textAlign: "left",
          }}
        >
          Discover the diverse dining options available at SFSU.
          From quick bites to fine dining, see what our campus
          has to offer in terms of food and beverages. Browse through
          our comprehensive list of food vendors to explore more!
        </p>

        <div className="extended-search-container">
          <h2 style={{ color: "#AD45FF" }}>{name}</h2>
          <p
            style={{
              color: "white",
              fontSize: "14px",
              margin: "0",
              lineHeight: "10px",
              display: "inline-flex",
              alignItems: "center",
            }}
          >

            <FaStar style={{ color: "yellow", marginRight: "2px" }} />
            {vendor.average_rating.toFixed(1)} ratings
            <FaCommentDots style={{ marginLeft: "7px", marginRight: "2px" }} /> {vendor.num_reviews}{" "}
            reviews
          </p>

          <div className="button-and-name">
            <input
              type="text"
              placeholder="SEARCH FOOD HERE"
              className="search-bar"
              value={searchText}
              onChange={handleSearchChange}
              // style={{
              //   marginTop: "20px",
              //   // marginLeft: "30px",
              //   width: "250px",
              //   height: "30px",
              //   borderRadius: "50px",
              //   backgroundColor: "gray",
              // }}
            />
          </div>

          <p
            style={{
              marginTop: "20px",
              fontSize: "20px",
              fontWeight: "bold",
              color: "white",
              textAlign: "left",
            }}
          >
            {" "}
            SCHEDULE
          </p>

          <p style={{ color: "#D3D3D3", fontSize: "14px", textAlign: "left" }}>
            {Object.entries(vendor.schedule).map(([day, hours]) => (
              <p key={day} style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ marginRight: "50px" }}>{day}</span>
                <span>{hours}</span>
              </p>
            ))}
          </p>

          <p
            style={{
              marginTop: "20px",
              fontSize: "20px",
              fontWeight: "bold",
              color: "white",
              textAlign: "left",
            }}
          >
            {" "}
            LOCATION
          </p>
          <p
            style={{
              color: "#D3D3D3",
              fontSize: "14px",
              marginBottom: "15px",
              textAlign: "center",
              paddingLeft: "70px",
              paddingRight: "70px",
            }}
          >
            {vendor.location}
          </p>

          {/* <p
            style={{
              marginTop: "20px",
              fontSize: "20px",
              fontWeight: "bold",
              color: "#AD45FF",
              textAlign: "left",
            }}
          >
            {" "}
            Rate & Review
          </p>
          <p
            style={{
              color: "#D3D3D3",
              fontSize: "14px",
              marginBottom: "15px",
              textAlign: "left",
            }}
          >
            Share your experience to help others
          </p>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                style={{ width: "300px", height: "30px", borderRadius: "50px" }}
                type="text"
                value={menuName}
                onChange={(e) => setMenuName(e.target.value)}
                placeholder="FOOD NAME"
                required
              />
            </div>
            <div className="input-group">
              <input
                style={{ width: "300px", height: "30px", borderRadius: "50px" }}
                type="number"
                value={menuRating}
                onChange={(e) => setMenuRating(e.target.value)}
                placeholder="LEVEL RATINGS"
                step="0.5"
                min="0"
                max="5"
                required
              />
            </div>
            <div className="input-group">
              <textarea
                style={{ width: "300px", height: "30px", borderRadius: "50px" }}
                value={menuReview}
                onChange={(e) => {
                  if (e.target.value.length <= 100) {
                    setMenuReview(e.target.value);
                  }

                  handleReviewChange(e);
                }}
                placeholder="WRITE YOUR FEEDBACK HERE..."
              />
            </div>
            <button type="submit" className="go-back-button">
              Submit
            </button>
          </form> */}
        </div>
      </div>

      <div
        className="menu-item-wrapper"

      >
        <h2 style={{ marginLeft: "20px", textAlign: "left" }}>Menu</h2>
        <p
          style={{
            color: "gray",
            marginLeft: "20px",
            fontSize: "16px",
            marginBottom: "15px",
            textAlign: "left",
          }}
        >
          Scroll down to explore more food options in the menu!
        </p>
        <div
          className="menu-wrapper"
          style={{
            width: "100%",
            height: "300px",
            // marginLeft: "15px",
            marginBottom: "70px",
            display: "grid",
            gridTemplate: "repeat(3, 1fr)",
            gap: "10px",
            overflow: "auto",
            padding: "20px",
          }}
        >

          {vendor.menu && vendor.menu.length > 0 ? (
            <div
              style={{
                gap: "15px",
                alignItems: "center",
                borderRadius: "50px",
              }}
            >
              {vendor.menu.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px",
                    backgroundColor: "#2C2C2E",
                    color: "gray",
                    fontSize: "18px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  <p>{item.name}</p> {item.price}
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: "white" }}>No menu available.</p>
          )}
        </div>













        <h2 style={{ marginLeft: "20px", textAlign: "left" }}>Leave feedback</h2>
        <p
          style={{
            color: "gray",
            marginLeft: "20px",
            fontSize: "16px",
            marginBottom: "15px",
            textAlign: "left",
          }}
        >
          Share your experience about a specific food from the menu above to help others
        </p>




        {/* <div className="rate-container"> */}
        <form className="form-box" onSubmit={handleSubmit}>
          <input
            type="text"
            value={menuName}
            onChange={(e) => setMenuName(e.target.value)}
            placeholder="FOOD NAME"
            required
          />
          <input
            type="number"
            value={menuRating}
            onChange={(e) => setMenuRating(e.target.value)}
            placeholder="LEVEL RATINGS"
            step="0.5"
            min="0"
            max="5"
            required
          />
          <textarea
            value={menuReview}
            onChange={(e) => {
              if (e.target.value.length <= 100) {
                setMenuReview(e.target.value);
              }

              handleReviewChange(e);
            }}
            placeholder="WRITE YOUR FEEDBACK HERE..."
          />

          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
        {/* </div> */}





        <h2 style={{ marginTop: "50px", marginLeft: "20px", textAlign: "left" }}>Read reviews</h2>
        <p
          style={{
            color: "gray",
            marginLeft: "20px",
            fontSize: "16px",
            marginBottom: "15px",
            textAlign: "left",
          }}
        >
          Check some reviews from other users to make informed choices!
        </p>

        <div className="grid-food-detail">
          {filteredItems.length > 0 &&
          filteredItems.some(
            (item) => item.menu_rating >= 0 || item.menu_review >= 0
          ) ? (
            filteredItems.map((item, index) => (
              <div
                key={index}
                className="small-grid-item"
                style={{
                  backgroundColor: "black",
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "left",
                  overflow: "hidden",
                  borderRadius: "30px",
                  width: "250px",
                  height: "auto",
                  paddingLeft: "14px",
                  paddingBottom: "14px",
                }}
              >
                <h3>{item.menu_name}</h3>
                <p
                  style={{
                    color: "white",
                    fontSize: "14px",
                    margin: "0",
                    lineHeight: "10px",
                    display: "inline-flex",
                    alignItems: "center",
                  }}
                >
                  <FaStar style={{ color: "yellow", marginRight: "5px" }} />
                  {item.menu_rating} ratings
                </p>
                <p
                  style={{
                    color: "white",
                    fontSize: "14px",
                    marginTop: "10px",
                    lineHeight: "20px",
                    display: "flex",
                    width: "100%",
                    paddingRight: "15px",
                  }}
                >
                  <FaCommentDots
                    style={{
                      marginRight: "10px",
                      flexShrink: 0,
                      marginTop: "4px",
                    }}
                  />
                  <span>{item.menu_review}</span>
                </p>
              </div>
            ))
          ) : (
            <div
              className="empty-grid-placeholder"
              style={{
                backgroundColor: "black",
                color: "white",
                width: "250px",
                height: "190px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "30px",
                marginBottom: "47px",
              }}
            >
              No Ratings &amp; Comments
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default VendorDetail;
