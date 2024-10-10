import React, { useState } from 'react';
import AWS from 'aws-sdk';
import { addAnimal } from '../apis/api'; // Import the addAnimal API function

const AddAnimalPopup = ({ isOpen, onClose, setAnimals }) => {
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('Dog');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [weight, setWeight] = useState('');
  const [vaccinated, setVaccinated] = useState(false);
  const [sterile, setSterile] = useState(false);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  // AWS S3 Configuration with hardcoded credentials
  const s3 = new AWS.S3({
    
  });

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const uploadImageToS3 = async (file, animalName) => {
    const params = {
      Bucket: 'pawpal.0.1', // Your bucket name
      Key: `${animalName}.jpg`, // Image name in the format of 'AnimalName.jpg'
      Body: file,
      ContentType: file.type,
      // Remove ACL line as per the previous guidance
    };
  
    try {
      const data = await s3.upload(params).promise();
      console.log('Image uploaded successfully:', data.Location);
      return data.Location; // Return the image URL
    } catch (error) {
      console.error('Error uploading image to S3:', error);
      throw error;
    }
  };

  const handleAddAnimal = async () => {
    // Validate inputs here (similar to the validation we did earlier)
    
    try {
      // Step 1: Upload image to S3
      const imageUrl = await uploadImageToS3(image, name);

      // Step 2: Prepare the animal object
      const newAnimal = {
        name,
        species,
        breed,
        age: parseInt(age),
        arrivalDate: new Date().toISOString().split('T')[0], // Send current date as arrival date
        status: 'Available',
        gender,
        weight: parseFloat(weight),
        vaccinated,
        sterile,
        description,
        imageUrl, // URL from the S3 upload
        categories: [], // Empty categories for now
      };

      // Step 3: Add the animal to the backend
      const addedAnimal = await addAnimal(newAnimal);
      
      // Update the local animals state
      setAnimals((prev) => [...prev, addedAnimal]);
      onClose(); // Close the popup after success
    } catch (error) {
      console.error('Error adding animal:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-pr p-8 rounded-lg shadow-lg w-3/4 max-w-5xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-700 transition duration-200 text-2xl"
        >
          &times;
        </button>

        <h3 className="text-3xl font-bold mb-4 text-sc">Add New Animal</h3>

        <div className="flex">
          {/* Image Upload on the Left */}
          <div className="w-1/3">
            <label className="block mb-2 text-xl font-semibold text-sc">Upload Image:</label>
            <input
              type="file"
              onChange={handleImageUpload}
              className="w-full border border-gray-300 rounded-md px-2 py-1"
            />
          </div>

          {/* Form Fields on the Right */}
          <div className="grid grid-cols-2 gap-4 w-2/3 ml-6">
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <select value={species} onChange={(e) => setSpecies(e.target.value)}>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
            </select>
            <input type="text" placeholder="Breed" value={breed} onChange={(e) => setBreed(e.target.value)} />
            <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
            <input type="text" placeholder="Gender (M/F)" value={gender} onChange={(e) => setGender(e.target.value)} />
            <input type="number" placeholder="Weight" value={weight} onChange={(e) => setWeight(e.target.value)} />
            <div>
              <label>Vaccinated:</label>
              <div className="flex items-center">
                <label className="mr-2">
                  <input
                    type="radio"
                    value={true}
                    checked={vaccinated === true}
                    onChange={() => setVaccinated(true)}
                  /> Yes
                </label>
                <label>
                  <input
                    type="radio"
                    value={false}
                    checked={vaccinated === false}
                    onChange={() => setVaccinated(false)}
                  /> No
                </label>
              </div>
            </div>
            <div>
              <label>Sterile:</label>
              <div className="flex items-center">
                <label className="mr-2">
                  <input
                    type="radio"
                    value={true}
                    checked={sterile === true}
                    onChange={() => setSterile(true)}
                  /> Yes
                </label>
                <label>
                  <input
                    type="radio"
                    value={false}
                    checked={sterile === false}
                    onChange={() => setSterile(false)}
                  /> No
                </label>
              </div>
            </div>
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-2"
            />
          </div>
        </div>

        <button
          className="mt-6 px-6 py-3 font-semibold rounded-lg bg-sc text-pr shadow-lg hover:bg-st transition duration-300"
          onClick={handleAddAnimal}
          disabled={uploading} // Disable button during image upload
        >
          {uploading ? 'Uploading...' : 'Add Animal'}
        </button>
      </div>
    </div>
  );
};

export default AddAnimalPopup;
