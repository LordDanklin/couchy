const { AuthenticationError } = require('apollo-server-express');
const { Comment, Listing, Reservation, Transaction, User } = require('../models');
const { signToken } = require('../utils/auth');

const { User, Listing, Reservation, Transaction, Comment } = require('./models');

const resolvers = {
  Query: {
    // Query to get all users
    getUsers: async () => {
      try {
        const users = await User.find({}).populate({ path: 'listing', select: '-__v' });
        return users;
      } catch (error) {
        throw new Error(error);
      }
    },

    // Query to get a single user by ID
    getUserById: async (_, { id }) => {
      try {
        const user = await User.findById(id).populate({ path: 'listing', select: '-__v' });
        return user;
      } catch (error) {
        throw new Error(error);
      }
    },

    // Query to get all listings
    getListings: async () => {
      try {
        const listings = await Listing.find({});
        return listings;
      } catch (error) {
        throw new Error(error);
      }
    },

    // Query to get a single listing by ID
    getListingById: async (_, { id }) => {
      try {
        const listing = await Listing.findById(id);
        return listing;
      } catch (error) {
        throw new Error(error);
      }
    },

    // Query to get all reservations
    getReservations: async () => {
      try {
        const reservations = await Reservation.find({});
        return reservations;
      } catch (error) {
        throw new Error(error);
      }
    },

    // Query to get all transactions
    getTransactions: async () => {
      try {
        const transactions = await Transaction.find({});
        return transactions;
      } catch (error) {
        throw new Error(error);
      }
    },

    // Query to get all comments
    getComments: async () => {
      try {
        const comments = await Comment.find({});
        return comments;
      } catch (error) {
        throw new Error(error);
      }
    },
  },

  Mutation: {
    // Mutation to create a new user
    createUser: async (_, { name, email, password }) => {
      try {
        const user = await User.create({ name, email, password });
        return user;
      } catch (error) {
        throw new Error(error);
      }
    },

    // Mutation to update a user by ID
    updateUser: async (_, { id, name, email, password }) => {
      try {
        const updatedUser = await User.findByIdAndUpdate(id, { name, email, password }, { new: true });
        return updatedUser;
      } catch (error) {
        throw new Error(error);
      }
    },

    // Mutation to delete a user by ID
    deleteUser: async (_, { id }) => {
      try {
        const deletedUser = await User.findByIdAndDelete(id);
        return deletedUser;
      } catch (error) {
        throw new Error(error);
      }
    },

    // Mutation to create a new listing
    createListing: async (_, { title, description, price }) => {
      try {
        const listing = await Listing.create({ title, description, price });
        return listing;
      } catch (error) {
        throw new Error(error);
      }
    },

    // Mutation to update a listing by ID
    updateListing: async (_, { id, title, description, price }) => {
      try {
        const updatedListing = await Listing.findByIdAndUpdate(id, { title, description, price }, { new: true });
        return updatedListing;
      } catch (error) {
        throw new Error(error);
      }
    },

    // Mutation to delete a listing by ID
    deleteListing: async (_, { id, title, description, price }) => {
      try {
        const deletedListing = await Listing.findByIdAndDelete(id, { title, description, price }, { new: true });
        return deletedListing;
      } catch (error) {
        throw new Error(error);
      }
    },
  }
};