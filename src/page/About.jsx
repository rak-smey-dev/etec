import React from 'react'

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-amber-400 to-orange-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
              About Khmer Recipes
            </h1>
            <div className="w-24 h-2 bg-white rounded-full mx-auto mb-8"></div>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-light">
              Preserving the rich culinary heritage of Cambodia, one recipe at a time. 
              Discover the authentic flavors passed down through generations.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-800 dark:text-white">
                Our <span className="text-amber-600">Mission</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                To celebrate and preserve the authentic flavors of Cambodian cuisine by 
                sharing traditional recipes, cooking techniques, and the cultural stories 
                behind each dish.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                We believe that food is more than just sustenance—it's a connection to 
                our heritage, our families, and our shared history as Khmer people.
              </p>
              <div className="flex gap-4 pt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300">Authentic Recipes</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300">Cultural Heritage</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl border border-amber-200 dark:border-gray-700">
                <div className="text-3xl w-10 h-10 mx-auto text-center mb-4 ">
                  <img src="/src/assets/crown.png" alt="" />
                </div>
                <h3 className="text-2xl font-bold text-amber-900 dark:text-amber-100 text-center mb-2">
                  Royal Heritage
                </h3>
                <p className="text-amber-700 dark:text-amber-300 text-center text-lg">
                  Recipes fit for Khmer royalty, preserved through generations
                </p>
              </div>
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-amber-400 rounded-full"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-orange-400 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
              What Makes Us <span className="text-amber-600">Unique</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover the pillars that define authentic Khmer cuisine
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group text-center p-8 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-700 dark:to-gray-600 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className=" w-10 h-10 mx-auto text-center text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <img src="/src/assets/ingredian.png" alt="" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                Authentic Ingredients
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Traditional herbs, spices, and fresh local ingredients that define the true essence of Khmer cuisine
              </p>
            </div>

            <div className="group text-center p-8 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-700 dark:to-gray-600 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className=" w-10 h-10 mx-auto text-center text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <img src="/src/assets/chef.png" alt="" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                Traditional Techniques
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Time-honored cooking methods passed down through generations of Cambodian families
              </p>
            </div>

            <div className="group text-center p-8 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-700 dark:to-gray-600 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="  w-10 h-10 mx-auto text-center text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <img src="/src/assets/book.png" alt="" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                Cultural Stories
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Learn the history and significance behind each traditional dish and its place in our culture
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Heritage Section */}
      <section className="py-20 bg-gradient-to-r from-amber-900 to-orange-300 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Khmer Culinary <span className="text-amber-200">Heritage</span>
              </h2>
              <p className="text-lg mb-6 leading-relaxed text-amber-100">
                Cambodian cuisine has a history dating back to the Khmer Empire, with 
                influences from India, China, and neighboring Southeast Asian countries. 
                Our recipes reflect this rich cultural tapestry.
              </p>
              <p className="text-lg leading-relaxed text-amber-100">
                From the royal palace dishes of Phnom Penh to the countryside favorites 
                of rural Cambodia, we bring you the most authentic and delicious recipes 
                from across the kingdom.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-amber-800/50 backdrop-blur-sm rounded-xl p-6 text-center border border-amber-600/30">
                <div className=" w-10 h-10 mx-auto text-center text-5xl mb-6 ">
                  <img src="public/image/rice.png" alt="" />
                </div>
                <div className="font-bold text-lg mb-1">Rice-Based</div>
                <div className="text-amber-200 text-sm">Core of every meal</div>
              </div>
              <div className="bg-amber-800/50 backdrop-blur-sm rounded-xl p-6 text-center border border-amber-600/30">
                <div className="w-10 h-10 mx-auto text-center text-5xl mb-6">
                  <img src="public/image/chli.png" alt="" />
                </div>
                <div className="font-bold text-lg mb-1">Balanced Spices</div>
                <div className="text-amber-200 text-sm">Harmonious flavors</div>
              </div>
              <div className="bg-amber-800/50 backdrop-blur-sm rounded-xl p-6 text-center border border-amber-600/30">
                <div className="w-10 h-10 mx-auto text-center text-5xl mb-6">
                  <img src="public/image/fish.png" alt="" />
                </div>
                <div className="font-bold text-lg mb-1">Freshwater Fish</div>
                <div className="text-amber-200 text-sm">Mekong specialties</div>
              </div>
              <div className="bg-amber-800/50 backdrop-blur-sm rounded-xl p-6 text-center border border-amber-600/30">
                <div className="w-10 h-10 mx-auto text-center text-5xl mb-6">
                  <img src="public/image/vegetable.png" alt="" />
                </div>
                <div className="font-bold text-lg mb-1">Fresh Herbs</div>
                <div className="text-amber-200 text-sm">Aromatic greens</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
              Our <span className="text-amber-600">Community</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Bringing together food lovers from all walks of life
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-10 h-10  text-center text-5xl bg-gradient-to-br from-amber-400 to-orange-700 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-3xl">
                  <img src="public/image/mama.png" alt="" />
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Grandmothers</h3>
              <p className="text-gray-600 dark:text-gray-400">Keepers of family recipes</p>
            </div>
            <div className="text-center group">
              <div className="w-10 h-10  text-center text-5xl bg-gradient-to-br from-amber-400 to-orange-700 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-3xl">
                  <img src="public/image/chef2.png" alt="" />
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Chefs</h3>
              <p className="text-gray-600 dark:text-gray-400">Modern interpretations</p>
            </div>
            <div className="text-center group">
              <div className="w-10 h-10  text-center text-5xl bg-gradient-to-br from-amber-400 to-orange-700 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-3xl">
                  <img src="public/image/home.png" alt="" />
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Home Cooks</h3>
              <p className="text-gray-600 dark:text-gray-400">Everyday family meals</p>
            </div>
            <div className="text-center group">
              <div className="w-10 h-10  text-center text-5xl bg-gradient-to-br from-amber-400 to-orange-700 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-3xl">
                  <img src="public/image/Goble.png" alt="" />
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Food Lovers</h3>
              <p className="text-gray-600 dark:text-gray-400">Global appreciation</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {/* <section className="py-20 bg-gradient-to-r from-amber-500 to-orange-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Join Our Culinary Journey
          </h2>
          <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Whether you're a seasoned chef or new to Khmer cuisine, there's always 
            something delicious to discover in our collection of authentic recipes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-amber-600 hover:bg-amber-50 font-bold py-4 px-8 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg">
              Explore Recipes
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-amber-600 font-bold py-4 px-8 rounded-lg transition duration-300 transform hover:scale-105">
              Share Your Recipe
            </button>
          </div>
        </div>
      </section> */}

      {/* Footer */}
      <footer className="bg-amber-900 dark:bg-gray-700 text-amber-100 py-12 mt-16">
        <div className="max-w-6xl mx-auto px-4 text-center ">
          <h3 className="text-2xl font-bold mb-4">Sharing Recipes</h3>
          <p className="text-amber-200 dark:text-gray-300 mb-6 max-w-md mx-auto">
            Preserving and sharing the rich culinary heritage of Cambodia through authentic recipes and traditional cooking methods.
          </p>
          <div className="flex justify-center space-x-6 mb-6">
            <a href="#" className="text-amber-200 dark:text-gray-300 hover:text-white dark:hover:text-amber-400 transition duration-300">About</a>
            <a href="#" className="text-amber-200 dark:text-gray-300 hover:text-white dark:hover:text-amber-400 transition duration-300">Recipes</a>
            <a href="#" className="text-amber-200 dark:text-gray-300 hover:text-white dark:hover:text-amber-400 transition duration-300">Contact</a>
          </div>
          <p className="text-amber-300 dark:text-gray-400 text-sm">© 2025 Khmer Food Shop. All rights reserved.</p>
        </div>
      </footer>
       
    </div>
  )
}

export default About