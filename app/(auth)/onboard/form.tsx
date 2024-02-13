"use client"

import Image from 'next/image'

export default function Form() {
  return (
    
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white py-8 px-6 rounded-lg sm:px-10">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image className="mx-auto h-12 w-auto" src='/../favicon.ico' width={500} height={500} alt="Fooder" />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
        <p className="mt-2 text-center text-sm text-gray-600 max-w">
          Already registered? 
          <a href="/dashboard" className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"> Sign in</a>
        </p>
      </div>
        <form className="mb-0 space-y-6" action="#" method="POST">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <div className="mt-1">
              <input id="name" name="name" type="name" className="border-2 border-black" required/>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email address</label>
            <div className="mt-1">
              <input id="email" name="email" type="email" className="border-2 border-black" required/>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Bio</label>
            <div className="mt-1">
              <input id="bio" name="bio" type="bio" required className="border-2 border-black" />
            </div>
          </div>

          <h3 className="mb-5 text-lg font-medium text-gray-900 dark:text-white">Choose Cuisines:</h3>
          <ul className="grid w-full gap-6 md:grid-cols-3">
            
            <div className="flex items-center me-4">
                <input id="checkbox" type="checkbox" value="" className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Chinese</label>
            </div>
            <div className="flex items-center me-4">
                <input id="checkbox" type="checkbox" value="" className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">American</label>
            </div>
            <div className="flex items-center me-4">
                <input id="checkbox" type="checkbox" value="" className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Vietnamese</label>
            </div>
            <div className="flex items-center me-4">
                <input id="checkbox" type="checkbox" value="" className="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 rounded focus:ring-teal-500 dark:focus:ring-teal-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Italian</label>
            </div>
            <div className="flex items-center me-4">
                <input id="checkbox" type="checkbox" value="" className="w-4 h-4 text-yellow-400 bg-gray-100 border-gray-300 rounded focus:ring-yellow-500 dark:focus:ring-yellow-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Greek</label>
            </div>
            <div className="flex items-center me-4">
                <input id="checkbox" type="checkbox" value="" className="w-4 h-4 text-orange-500 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Indian</label>
            </div>
          </ul>


          <div className="slidecontainer">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Distance radius: 50</label>
            <input id="default-range" type="range" value="50" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"/>
          </div>
        
            <div>
              <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Sign up</button>
            </div>
          </form>
      </div>
    </div>
  )
}
