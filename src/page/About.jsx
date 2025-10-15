import React from 'react'

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 py-12">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-amber-900 mb-6">
            About Khmer Recipes
          </h1>
          <div className="w-24 h-1 bg-amber-500 mx-auto mb-8"></div>
          <p className="text-xl text-amber-700 max-w-3xl mx-auto leading-relaxed">
            Preserving the rich culinary heritage of Cambodia, one recipe at a time. 
            Discover the authentic flavors that have been passed down through generations.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-16 border border-amber-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-amber-800 mb-6">Our Mission</h2>
              <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                To celebrate and preserve the authentic flavors of Cambodian cuisine by 
                sharing traditional recipes, cooking techniques, and the cultural stories 
                behind each dish.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                We believe that food is more than just sustenance—it's a connection to 
                our heritage, our families, and our shared history as Khmer people.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="bg-gradient-to-br from-amber-200 to-orange-200 rounded-2xl p-8 w-full max-w-md">
                <div className="text-6xl text-center mb-4">👑</div>
                <h3 className="text-xl font-semibold text-amber-900 text-center mb-2">Royal Heritage</h3>
                <p className="text-amber-700 text-center">Recipes fit for Khmer royalty</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-amber-100 text-center hover:shadow-xl transition duration-300">
            <div className="text-4xl mb-4">🌿</div>
            <h3 className="text-xl font-bold text-amber-800 mb-4">Authentic Ingredients</h3>
            <p className="text-gray-600">
              Traditional herbs, spices, and fresh local ingredients that define Khmer cuisine
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-amber-100 text-center hover:shadow-xl transition duration-300">
            <div className="text-4xl mb-4">👩‍🍳</div>
            <h3 className="text-xl font-bold text-amber-800 mb-4">Traditional Techniques</h3>
            <p className="text-gray-600">
              Time-honored cooking methods passed down through generations of Cambodian families
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-amber-100 text-center hover:shadow-xl transition duration-300">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-bold text-amber-800 mb-4">Cultural Stories</h3>
            <p className="text-gray-600">
              Learn the history and significance behind each traditional dish
            </p>
          </div>
        </div>

        {/* History Section */}
        <div className="bg-amber-900 text-white rounded-3xl p-8 md:p-12 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Khmer Culinary Heritage</h2>
              <p className="text-amber-100 text-lg mb-6 leading-relaxed">
                Cambodian cuisine has a history dating back to the Khmer Empire, with 
                influences from India, China, and neighboring Southeast Asian countries. 
                Our recipes reflect this rich cultural tapestry.
              </p>
              <p className="text-amber-100 text-lg leading-relaxed">
                From the royal palace dishes of Phnom Penh to the countryside favorites 
                of rural Cambodia, we bring you the most authentic and delicious recipes 
                from across the kingdom.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-amber-800 rounded-xl p-6 text-center">
                <div className="text-3xl mb-2">🍚</div>
                <div className="font-semibold">Rice-Based</div>
                <div className="text-amber-200 text-sm">Core of every meal</div>
              </div>
              <div className="bg-amber-800 rounded-xl p-6 text-center">
                <div className="text-3xl mb-2">🌶️</div>
                <div className="font-semibold">Balanced Spices</div>
                <div className="text-amber-200 text-sm">Harmonious flavors</div>
              </div>
              <div className="bg-amber-800 rounded-xl p-6 text-center">
                <div className="text-3xl mb-2">🐟</div>
                <div className="font-semibold">Freshwater Fish</div>
                <div className="text-amber-200 text-sm">Mekong specialties</div>
              </div>
              <div className="bg-amber-800 rounded-xl p-6 text-center">
                <div className="text-3xl mb-2">🥬</div>
                <div className="font-semibold">Fresh Herbs</div>
                <div className="text-amber-200 text-sm">Aromatic greens</div>
              </div>
            </div>
          </div>
        </div>

        {/* Team/Community Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-amber-200">
          <h2 className="text-3xl font-bold text-amber-800 text-center mb-12">Our Community</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-amber-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👵</span>
              </div>
              <h3 className="font-semibold text-amber-900 mb-2">Grandmothers</h3>
              <p className="text-gray-600 text-sm">Keepers of family recipes</p>
            </div>
            <div className="text-center">
              <div className="bg-amber-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👨‍🍳</span>
              </div>
              <h3 className="font-semibold text-amber-900 mb-2">Chefs</h3>
              <p className="text-gray-600 text-sm">Modern interpretations</p>
            </div>
            <div className="text-center">
              <div className="bg-amber-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏠</span>
              </div>
              <h3 className="font-semibold text-amber-900 mb-2">Home Cooks</h3>
              <p className="text-gray-600 text-sm">Everyday family meals</p>
            </div>
            <div className="text-center">
              <div className="bg-amber-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌍</span>
              </div>
              <h3 className="font-semibold text-amber-900 mb-2">Food Lovers</h3>
              <p className="text-gray-600 text-sm">Global appreciation</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h2 className="text-2xl font-bold text-amber-800 mb-6">Join Our Culinary Journey</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Whether you're a seasoned chef or new to Khmer cuisine, there's always 
            something delicious to discover in our collection of authentic recipes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105">
              Explore Recipes
            </button>
            <button className="border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white font-semibold py-3 px-8 rounded-lg transition duration-300">
              Share Your Recipe
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About