import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import Select from "react-select"; // Import react-select
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa"; // React Icons for Edit, Delete, and Add
import apiClient, { apiEndpoints } from "./Apis"; // Adjust imports

const universitiesData = [
  { state: "Alabama", university: "University of Alabama" },
  { state: "Alabama", university: "Auburn University" },
  { state: "Alabama", university: "Samford University" },
  { state: "Alaska", university: "University of Alaska Fairbanks" },
  { state: "Alaska", university: "University of Alaska Anchorage" },
  { state: "Alaska", university: "Alaska Pacific University" },
  { state: "Arizona", university: "Arizona State University" },
  { state: "Arizona", university: "University of Arizona" },
  { state: "Arizona", university: "Northern Arizona University" },
  { state: "Arkansas", university: "University of Arkansas" },
  { state: "Arkansas", university: "Arkansas State University" },
  { state: "Arkansas", university: "Harding University" },
  { state: "California", university: "Stanford University" },
  { state: "California", university: "University of California, Berkeley" },
  { state: "California", university: "University of Southern California" },
  { state: "California", university: "California Institute of Technology" },
  { state: "Colorado", university: "University of Colorado Boulder" },
  { state: "Colorado", university: "Colorado State University" },
  { state: "Colorado", university: "Colorado College" },
  { state: "Colorado", university: "University of Denver" },
  { state: "Connecticut", university: "Yale University" },
  { state: "Connecticut", university: "University of Connecticut" },
  { state: "Connecticut", university: "Wesleyan University" },
  { state: "Connecticut", university: "Trinity College" },
  { state: "Delaware", university: "University of Delaware" },
  { state: "Delaware", university: "Delaware State University" },
  { state: "Delaware", university: "Wilmington University" },
  { state: "Florida", university: "University of Florida" },
  { state: "Florida", university: "Florida State University" },
  { state: "Florida", university: "University of Miami" },
  { state: "Florida", university: "University of Central Florida" },
  { state: "Florida", university: "Florida Atlantic University" },
  { state: "Georgia", university: "University of Georgia" },
  { state: "Georgia", university: "Georgia Institute of Technology" },
  { state: "Georgia", university: "Emory University" },
  { state: "Georgia", university: "Mercer University" },
  { state: "Hawaii", university: "University of Hawaii at Manoa" },
  { state: "Hawaii", university: "Hawaii Pacific University" },
  { state: "Hawaii", university: "Brigham Young University–Hawaii" },
  { state: "Idaho", university: "University of Idaho" },
  { state: "Idaho", university: "Boise State University" },
  { state: "Idaho", university: "Idaho State University" },
  { state: "Illinois", university: "University of Chicago" },
  { state: "Illinois", university: "Northwestern University" },
  { state: "Illinois", university: "University of Illinois Urbana-Champaign" },
  { state: "Illinois", university: "Illinois Institute of Technology" },
  { state: "Indiana", university: "Indiana University Bloomington" },
  { state: "Indiana", university: "Purdue University" },
  { state: "Indiana", university: "University of Notre Dame" },
  { state: "Indiana", university: "Ball State University" },
  { state: "Iowa", university: "University of Iowa" },
  { state: "Iowa", university: "Iowa State University" },
  { state: "Iowa", university: "Drake University" },
  { state: "Kansas", university: "University of Kansas" },
  { state: "Kansas", university: "Kansas State University" },
  { state: "Kansas", university: "Wichita State University" },
  { state: "Kentucky", university: "University of Kentucky" },
  { state: "Kentucky", university: "University of Louisville" },
  { state: "Kentucky", university: "Berea College" },
  { state: "Louisiana", university: "Louisiana State University" },
  { state: "Louisiana", university: "Tulane University" },
  { state: "Louisiana", university: "University of Louisiana at Lafayette" },
  { state: "Maine", university: "University of Maine" },
  { state: "Maine", university: "Bowdoin College" },
  { state: "Maine", university: "Bates College" },
  { state: "Maryland", university: "University of Maryland" },
  { state: "Maryland", university: "Johns Hopkins University" },
  { state: "Maryland", university: "Towson University" },
  { state: "Massachusetts", university: "Harvard University" },
  {
    state: "Massachusetts",
    university: "Massachusetts Institute of Technology",
  },
  { state: "Massachusetts", university: "Boston University" },
  { state: "Massachusetts", university: "University of Massachusetts Amherst" },
  { state: "Michigan", university: "University of Michigan" },
  { state: "Michigan", university: "Michigan State University" },
  { state: "Michigan", university: "Wayne State University" },
  { state: "Michigan", university: "Calvin University" },
  { state: "Minnesota", university: "University of Minnesota" },
  { state: "Minnesota", university: "Carleton College" },
  { state: "Minnesota", university: "Macalester College" },
  { state: "Mississippi", university: "University of Mississippi (Ole Miss)" },
  { state: "Mississippi", university: "Mississippi State University" },
  { state: "Mississippi", university: "Jackson State University" },
  { state: "Missouri", university: "University of Missouri" },
  { state: "Missouri", university: "Washington University in St. Louis" },
  { state: "Missouri", university: "Saint Louis University" },
  { state: "Montana", university: "University of Montana" },
  { state: "Montana", university: "Montana State University" },
  { state: "Montana", university: "Carroll College" },
  { state: "Nebraska", university: "University of Nebraska–Lincoln" },
  { state: "Nebraska", university: "Creighton University" },
  { state: "Nebraska", university: "Nebraska Wesleyan University" },
  { state: "Nevada", university: "University of Nevada, Reno" },
  { state: "Nevada", university: "University of Nevada, Las Vegas" },
  { state: "Nevada", university: "Nevada State College" },
  { state: "New Hampshire", university: "Dartmouth College" },
  { state: "New Hampshire", university: "University of New Hampshire" },
  { state: "New Hampshire", university: "Keene State College" },
  { state: "New Jersey", university: "Princeton University" },
  { state: "New Jersey", university: "Rutgers University" },
  { state: "New Jersey", university: "Stevens Institute of Technology" },
  { state: "New Mexico", university: "University of New Mexico" },
  { state: "New Mexico", university: "New Mexico State University" },
  {
    state: "New Mexico",
    university: "New Mexico Institute of Mining and Technology",
  },
  { state: "New York", university: "Columbia University" },
  { state: "New York", university: "New York University" },
  { state: "New York", university: "Cornell University" },
  { state: "New York", university: "University at Buffalo (SUNY)" },
  {
    state: "North Carolina",
    university: "University of North Carolina at Chapel Hill",
  },
  { state: "North Carolina", university: "Duke University" },
  { state: "North Carolina", university: "North Carolina State University" },
  { state: "North Carolina", university: "Wake Forest University" },
  { state: "North Dakota", university: "University of North Dakota" },
  { state: "North Dakota", university: "North Dakota State University" },
  { state: "North Dakota", university: "Minot State University" },
  { state: "Ohio", university: "Ohio State University" },
  { state: "Ohio", university: "Case Western Reserve University" },
  { state: "Ohio", university: "University of Cincinnati" },
  { state: "Ohio", university: "Oberlin College" },
  { state: "Oklahoma", university: "University of Oklahoma" },
  { state: "Oklahoma", university: "Oklahoma State University" },
  { state: "Oklahoma", university: "University of Tulsa" },
  { state: "Oregon", university: "University of Oregon" },
  { state: "Oregon", university: "Oregon State University" },
  { state: "Oregon", university: "Willamette University" },
  { state: "Pennsylvania", university: "University of Pennsylvania" },
  { state: "Pennsylvania", university: "Pennsylvania State University" },
  { state: "Pennsylvania", university: "Carnegie Mellon University" },
  { state: "Pennsylvania", university: "Temple University" },
  { state: "Rhode Island", university: "Brown University" },
  { state: "Rhode Island", university: "University of Rhode Island" },
  { state: "Rhode Island", university: "Providence College" },
  { state: "South Carolina", university: "University of South Carolina" },
  { state: "South Carolina", university: "Clemson University" },
  { state: "South Carolina", university: "Furman University" },
  { state: "South Dakota", university: "University of South Dakota" },
  { state: "South Dakota", university: "South Dakota State University" },
  { state: "Tennessee", university: "Vanderbilt University" },
  { state: "Tennessee", university: "University of Tennessee" },
  { state: "Tennessee", university: "Rhodes College" },
  { state: "Texas", university: "University of Texas at Austin" },
  { state: "Texas", university: "Rice University" },
  { state: "Texas", university: "Texas A&M University" },
  { state: "Texas", university: "Baylor University" },
  { state: "Utah", university: "University of Utah" },
  { state: "Utah", university: "Brigham Young University" },
  { state: "Utah", university: "Utah State University" },
  { state: "Vermont", university: "University of Vermont" },
  { state: "Vermont", university: "Middlebury College" },
  { state: "Virginia", university: "University of Virginia" },
  { state: "Virginia", university: "Virginia Tech" },
  { state: "Virginia", university: "James Madison University" },
  { state: "Washington", university: "University of Washington" },
  { state: "Washington", university: "Washington State University" },
  { state: "Washington", university: "Gonzaga University" },
  { state: "West Virginia", university: "West Virginia University" },
  { state: "West Virginia", university: "Marshall University" },
  { state: "Wisconsin", university: "University of Wisconsin-Madison" },
  { state: "Wisconsin", university: "Marquette University" },
  { state: "Wisconsin", university: "University of Wisconsin–Milwaukee" },
  { state: "Wyoming", university: "University of Wyoming" },
  { state: "Wyoming", university: "Wyoming State University" },
];

const universityOptions = universitiesData.map((uni) => ({
  value: uni.university,
  label: uni.university,
}));

const AccommodationManagement = () => {
  const [accommodationData, setAccommodationData] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedAccommodation, setSelectedAccommodation] = useState(null); // For editing
  const [modalOpen, setModalOpen] = useState(false); // Modal open state
  const [status, setStatus] = useState("active");
  const [formData, setFormData] = useState({
    placeLink: "",
    space: "",
    rent: "",
    placeName: "",
    university: "",
    contact: "",
    distance: "",
    status :''
  });

  // State for add accommodation modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleUniversityChange = (selectedOption) => {
    setFormData((prev) => ({ ...prev, university: selectedOption.value }));
  };

  useEffect(() => {
    fetchAccommodationData();
  }, [currentPage, search]);

  const fetchAccommodationData = async () => {
    try {
      const params = { page: currentPage, search }; // Send search query and page
      const response = await apiClient.get(apiEndpoints.accommodationlist, {
        params,
      });
      setAccommodationData(response.data.accommodations); // Assuming response contains the accommodation list
      setTotalPages(response.data.totalPages); // Assuming pagination info in response
    } catch (error) {
      console.error("Error fetching accommodation data:", error);
    }
  };

  const handleDelete = async (accommodationId) => {
    try {
      const response = await apiClient.delete(
        `${apiEndpoints.accommodationdelete}/${accommodationId}`
      );
      if (response.status === 200) {
        Swal.fire(
          "Deleted",
          "Accommodation data deleted successfully!",
          "success"
        );
        fetchAccommodationData(); // Refresh table data
      }
    } catch (error) {
      Swal.fire("Error", "Failed to delete accommodation data!", "error");
    }
  };

  const handleEdit = (accommodation) => {
    // Open the modal and populate form with selected accommodation data
    setSelectedAccommodation(accommodation);
    setFormData({
      placeLink: accommodation.placeLink,
      space: accommodation.space,
      rent: accommodation.rent,
      placeName: accommodation.placeName,
      university: accommodation.university,
      contact: accommodation.contact,
      distance: accommodation.distance,
    });
    setIsAddModalOpen(true); // Show modal for editing
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.put(
        `${apiEndpoints.accommodationedit}/${selectedAccommodation._id}`,
        formData
      );
      if (response.status === 200) {
        Swal.fire(
          "Updated",
          "Accommodation data updated successfully!",
          "success"
        );
        setIsAddModalOpen(false); // Close modal
        fetchAccommodationData(); // Refresh data
      }
    } catch (error) {
      Swal.fire("Error", "Failed to update accommodation data!", "error");
    }
  };

  const handleAddAccommodation = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.post(
        apiEndpoints.accommodationadd,
        formData
      );
      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Added",
          text: "Accommodation data added successfully!",
        });
        setIsAddModalOpen(false); // Close modal
        fetchAccommodationData(); // Refresh data
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to add accommodation data!",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to add accommodation data!",
      });
      console.error("Error adding accommodation data:", error);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleOpenAddModal = () => {
    setSelectedAccommodation(null); // Clear selected accommodation for adding a new one
    setFormData({
      placeLink: "",
      space: "",
      rent: "",
      placeName: "",
      university: "",
      contact: "",
      distance: "",
    }); // Reset form data
    setIsAddModalOpen(true); // Open modal
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Accommodation Management
        </h2>
        <button
          onClick={handleOpenAddModal}
          className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 flex items-center"
        >
          <FaPlus className="mr-2" /> Add Accommodation
        </button>
        <div className="mb-4 flex justify-between items-center">
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Search by place name"
          />
        </div>

        {/* Table */}
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Place Name</th>
              <th className="px-4 py-2 border-b">Place Link</th>
              <th className="px-4 py-2 border-b">Space</th>
              <th className="px-4 py-2 border-b">Rent</th>
              <th className="px-4 py-2 border-b">University</th>
              <th className="px-4 py-2 border-b">Distance</th>
              <th className="px-4 py-2 border-b">Contact</th>
              <th className="px-4 py-2 border-b">Status</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {accommodationData.map((accommodation) => (
              <tr key={accommodation._id}>
                <td className="px-4 py-2 border-b">
                  {accommodation.placeName}
                </td>
                <td className="px-4 py-2 border-b">
                  {accommodation.placeLink}
                </td>
                <td className="px-4 py-2 border-b">{accommodation.space}</td>
                <td className="px-4 py-2 border-b">{accommodation.rent}</td>
                <td className="px-4 py-2 border-b">
                  {accommodation.university}
                </td>
                <td className="px-4 py-2 border-b">{accommodation.distance}</td>
                <td className="px-4 py-2 border-b">{accommodation.contact}</td>
                <td className="px-4 py-2 border-b">{accommodation.status}</td>
                <td className="px-4 py-2 border-b">
                  <button
                    onClick={() => handleEdit(accommodation)}
                    className="text-blue-500 mr-2"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(accommodation._id)}
                    className="text-red-500"
                  >
                    <FaTrash /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Next
          </button>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              {selectedAccommodation ? "Edit" : "Add"} Accommodation Details
            </h2>
            <form
              onSubmit={
                selectedAccommodation
                  ? handleSubmitEdit
                  : handleAddAccommodation
              }
            >
              {/* Form Fields */}
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Place Link
                </label>
                <input
                  type="text"
                  value={formData.placeLink}
                  onChange={(e) =>
                    setFormData({ ...formData, placeLink: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Space
                </label>
                <input
                  type="text"
                  value={formData.space}
                  onChange={(e) =>
                    setFormData({ ...formData, space: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Rent
                </label>
                <input
                  type="text"
                  value={formData.rent}
                  onChange={(e) =>
                    setFormData({ ...formData, rent: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Place Name
                </label>
                <input
                  type="text"
                  value={formData.placeName}
                  onChange={(e) =>
                    setFormData({ ...formData, placeName: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Select Near By College
                </label>
                <Select
                  options={universityOptions}
                  onChange={handleUniversityChange}
                  value={
                    universityOptions.find(
                      (option) => option.value === formData.university
                    ) || null
                  }
                  placeholder="Select a College"
                  className="react-select-container"
                  classNamePrefix="react-select"
                  isSearchable
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Distance to the Collge
                </label>
                <input
                  type="text"
                  value={formData.distance}
                  onChange={(e) =>
                    setFormData({ ...formData, distance: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Contact Details
                </label>
                <input
                  type="text"
                  value={formData.contact}
                  onChange={(e) =>
                    setFormData({ ...formData, contact: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <label htmlFor="status" className="text-gray-800 font-medium">
                  Status:
                </label><br />
              <div className="flex w-full items-center space-x-3">
                <select
                  id="status"
                  name="status"
                  className="bg-white border px-4 py-3 w-full mb-2 border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  hover:border-gray-400 transition-all duration-200 shadow-sm"
                  value={status} // Assuming `status` is a state variable
                  onChange={(e) => setStatus({...formData,status : e.target.value})} // Update the state
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                >
                  {selectedAccommodation ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccommodationManagement;
