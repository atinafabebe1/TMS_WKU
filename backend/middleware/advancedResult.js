const { ROLE_HEADOFDEPLOYMENT, ROLE_DIRECTOR } = require("../constants");
const asyncHandler = require("./async");
const NodeCache = require("node-cache");

// Create a new cache instance
const cache = new NodeCache();

const advancedResults = (model, populate, cacheDuration = 30 * 60) =>
  asyncHandler(async (req, res, next) => {
    const lastUpdated = await model.findOne().sort("-updatedAt");
    // Get the cache key from the request URL
    const cacheKey = `${
      req.originalUrl || req.url
    }-${lastUpdated.updatedAt.getTime()}`;

    // Check if the data is already cached
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      // If the data is cached, return it and skip the rest of the middleware
      return res.status(200).json(cachedData);
    }

    let query;

    // Copy req.query
    const reqQuery = { ...req.query };
    // Fields to exclude
    const removeFields = ["select", "sort", "page", "limit"];

    // Loop over removeFields and delete them from reqQuery
    removeFields.forEach((param) => delete reqQuery[param]);

    // Create query string
    let queryStr = JSON.stringify(reqQuery);

    // Create operators ($gt, $gte, etc)
    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      (match) => `$${match}`
    );

    // Finding resource
    query = model.find(JSON.parse(queryStr));

    // Select Fields
    if (req.query.select) {
      const fields = req.query.select.split(",").join(" ");
      query = query.select(fields);
    }

    // Sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 25;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await model.countDocuments(JSON.parse(queryStr));

    query = query.skip(startIndex).limit(limit);

    if (populate) {
      query = query.populate(populate);
    }

    let results;
    // Executing query
    // if (
    //   req.user.role === ROLE_HEADOFDEPLOYMENT ||
    //   req.user.role === ROLE_DIRECTOR ||
    //   req.user.role === ROLE_DIRECTOR
    // ) {
    // } else {
    //   results = await query.find({ user: req.user.id }).lean();
    // }
    results = await query.find({});

    // Pagination result
    const pagination = {};

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit,
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit,
      };
    }

    const responseData = {
      success: true,
      count: results.length,
      pagination,
      data: results,
    };

    // Cache the response data
    const cacheData = JSON.parse(JSON.stringify(responseData));
    cache.set(cacheKey, cacheData, cacheDuration);

    res.advancedResults = responseData;

    next();
  });

module.exports = advancedResults;
