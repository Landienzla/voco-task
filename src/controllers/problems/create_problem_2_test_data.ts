import { RequestWithUser } from "../../types";
import sendResponse from "../../utils/sendResponse";
import { Response } from "express";
import { Restaurant as RestaurantModel } from "../../models/restaurant";

export default async (req: RequestWithUser, res: Response) => {
  const testRestaurants = [
    {
      name: 'Lahmacun Palace',
      description: 'Delicious lahmacun and traditional Turkish dishes',
      location: {
        coordinates: [32.85, 39.93] // Ankara, near specified coordinates
      }
    },
    {
      name: 'Istanbul Kebab House',
      description: 'Authentic kebabs and more, occasionally serving lahmacun',
      location: {
        coordinates: [28.9784, 41.0082] // Istanbul
      }
    },
    {
      name: 'Mediterranean Delight',
      description: 'A mix of Mediterranean flavors, including lahmacun',
      location: {
        coordinates: [27.1428, 38.4237] // Izmir
      }
    },
    {
      name: 'Ankara Grill',
      description: 'Famous for kebabs but also serves great lahmacun',
      location: {
        coordinates: [32.8541, 39.9208] // Another location in Ankara
      }
    },
    {
      name: 'Gourmet`Ïs Choice',
      description: 'International cuisine with occasional Turkish specials',
      location: {
        coordinates: [29.0404, 41.0435] // Istanbul, another district
      }
    },
    {
      name: 'Traditional Tastes',
      description: 'Experience the true taste of Turkish lahmacun and more',
      location: {
        coordinates: [32.8667, 39.9333] // Ankara, slightly further from specified coordinates
      }
    },
    {
      name: 'Cozy Corner',
      description: 'A small, delightful place for quick bites and pizzas',
      location: {
        coordinates: [29.03, 41.04] // Istanbul
      }
    },
    {
      name: 'Bosphorus Seafood',
      description: 'Fresh seafood and magnificent views of the Bosphorus',
      location: {
        coordinates: [29.0077, 41.0255] // Near the Bosphorus in Istanbul
      }
    },
    {
      name: 'Antalya Beach Cafe',
      description: 'Enjoy a variety of snacks and drinks by the beautiful Antalya beach',
      location: {
        coordinates: [30.7133, 36.8969] // Antalya
      }
    },
    {
      name: 'Ephesus History Diner',
      description: 'Dine amidst history with a view of the Ephesus ruins',
      location: {
        coordinates: [27.3411, 37.9397] // Near Ephesus
      }
    },
    {
      name: 'Cappadocia Cave Restaurant',
      description: 'Unique dining experience in a cave setting in Cappadocia',
      location: {
        coordinates: [34.8340, 38.6453] // Cappadocia
      }
    },
    {
      name: 'Eastern Delicacies',
      description: 'Experience the flavors of eastern Turkish cuisine',
      location: {
        coordinates: [40.7655, 37.8772] // Eastern Turkey
      }
    },
    {
      name: 'Black Sea Fish House',
      description: 'Specializing in fish and seafood from the Black Sea',
      location: {
        coordinates: [31.3785, 41.0287] // Black Sea region
      }
    },
    {
      name: 'Ottoman Cuisine',
      description: 'Traditional Ottoman dishes prepared with a modern twist',
      location: {
        coordinates: [32.8569, 39.9241] // Central Ankara
      }
    }
  ];
  

  const restaurants = await RestaurantModel.insertMany(testRestaurants);

  return sendResponse(req, res, 200, {
    message: "success",
    restaurants,
  });
};
