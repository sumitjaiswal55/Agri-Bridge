import React, { useState } from "react";
import { FaCloudUploadAlt, FaTimes } from "react-icons/fa";
import axios from "axios";

const AddListing = () => {

  // ===================== FORM STATE =====================
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "Vegetables",
    quantity: "Kg",
    pricePerUnit: "",
    quantityAvailable: "",
    minOrderQuantity: 10,
    grade: "Mix",
    harvestDate: "",
  });

  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);

  // Message State (Success / Error)
  const response = await axios.post("http://localhost:3000/api/create", data, {
            headers: { "Authorization": `Bearer ${token}` }
        });

        // 3. Success Handling
        if(response.data.success) {
            setSuccess("🎉 Crop listed successfully! Redirecting...");
            
            // 2 Second baad redirect karo taaki user message padh le
            setTimeout(() => {
                navigate("/dashboard/my-listings"); // ✅ Redirect Logic
            }, 2000);
        }

  const [loading, setLoading] = useState(false);

  // ===================== HANDLERS =====================
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setImages((prev) => [...prev, ...files]);
    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...previewUrls]);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
    setPreviews(previews.filter((_, i) => i !== index));
  };

  // ===================== SUBMIT =====================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    images.forEach((img) => {
      data.append("images", img);
    });

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:3000/api/create",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setMessage({
          text: "Crop listed successfully!",
          type: "success",
        });

        // Reset form
        setFormData({
          name: "",
          description: "",
          category: "Vegetables",
          quantity: "Kg",
          pricePerUnit: "",
          quantityAvailable: "",
          minOrderQuantity: 10,
          grade: "Mix",
          harvestDate: "",
        });
        setImages([]);
        setPreviews([]);
      }
    } catch (error) {
      setMessage({
        text:
          error.response?.data?.message ||
          "Failed to list. Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-listing-container">
      <div className="form-card">
        <div className="form-header">
          <h2>Add New Crop</h2>
          <p>Fill in the details to list your produce on AgriBridge.</p>
        </div>


         {/* MESSAGE BOX */}
        {message.text && (
          <div className={`message-box ${message.type}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* --- Section 1: Basic Info --- */}
          <div className="form-section">
            <label>Crop Name <span className="required">*</span></label>
            <input
              type="text"
              name="name"
              placeholder="e.g. Sharbati Wheat, Red Onion"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <div className="row-2">
              <div className="input-group">
                <label>Category <span className="required">*</span></label>
                <select name="category" value={formData.category} onChange={handleChange}>
                  <option value="Vegetables">Vegetables</option>
                  <option value="Fruits">Fruits</option>
                  <option value="Grains">Grains</option>
                  <option value="Spices">Spices</option>
                </select>
              </div>

              <div className="input-group">
                <label>Quality Grade</label>
                <select name="grade" value={formData.grade} onChange={handleChange}>
                  <option value="A">Grade A (Export Quality)</option>
                  <option value="B">Grade B (Standard)</option>
                  <option value="C">Grade C (Small/Rough)</option>
                  <option value="Mix">Mix</option>
                </select>
              </div>
            </div>

            <label>Description (Min 30 chars) <span className="required">*</span></label>
            <textarea
              name="description"
              placeholder="Describe freshness, origin, and quality..."
              rows="4"
              value={formData.description}
              onChange={handleChange}
              minLength="30"
              required
            ></textarea>
          </div>

          <hr />

          {/* --- Section 2: Pricing & Stock --- */}
          <div className="form-section">
            <div className="row-3">
              <div className="input-group">
                <label>Price (₹) <span className="required">*</span></label>
                <input
                  type="number"
                  name="pricePerUnit"
                  placeholder="e.g. 2000"
                  value={formData.pricePerUnit}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label>Unit Type <span className="required">*</span></label>
                <select name="quantity" value={formData.quantity} onChange={handleChange}>
                  <option value="Kg">Per Kg</option>
                  <option value="g">Per Gram</option>
                  <option value="quintal">Per Quintal</option>
                  <option value="ton">Per Ton</option>
                  <option value="dozen">Per Dozen</option>
                </select>
              </div>

              <div className="input-group">
                <label>Total Stock <span className="required">*</span></label>
                <input
                  type="number"
                  name="quantityAvailable"
                  placeholder="Available Qty"
                  value={formData.quantityAvailable}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="row-2">
               <div className="input-group">
                <label>Min. Order Quantity</label>
                <input
                  type="number"
                  name="minOrderQuantity"
                  value={formData.minOrderQuantity}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label>Harvest Date <span className="required">*</span></label>
                <input
                  type="date"
                  name="harvestDate"
                  value={formData.harvestDate}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <hr />

          {/* --- Section 3: Images --- */}
          <div className="form-section">
            <label>Upload Images</label>
            <div className="image-upload-box">
              <input
                type="file"
                id="file-input"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="file-input-hidden"
              />
              <label htmlFor="file-input" className="upload-label">
                <FaCloudUploadAlt className="upload-icon" />
                <p>Click to upload crop images</p>
                <span>Supported formats: JPG, PNG, JPEG</span>
              </label>
            </div>

            {/* Image Previews */}
            {previews.length > 0 && (
              <div className="image-previews">
                {previews.map((src, index) => (
                  <div key={index} className="preview-card">
                    <img src={src} alt="preview" />
                    <button type="button" onClick={() => removeImage(index)}>
                      <FaTimes />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? "Listing..." : "List My Crop"}
          </button>
          {/* <button type="submit" className="btn-submit">List My Crop</button> */}
        </form>
      </div>
    </div>
  );
};

export default AddListing;
