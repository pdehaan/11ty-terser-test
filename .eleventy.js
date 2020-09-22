const makeSynchronous = require("make-synchronous");

const jsmin = makeSynchronous(async (code="", opts={}) => {
  const Terser = require("terser");
  try {
    const minified = await Terser.minify(code, opts);
    return minified.code;
  } catch (err) {
    console.error(err);
    // Unexpected minify error. Return unminified code.
    return code;
  }
});

module.exports = function (eleventyConfig) {
  eleventyConfig.addPairedShortcode("terser", jsmin);

  return {
    dir: {
      input: "src",
      output: "www"
    }
  };
};
