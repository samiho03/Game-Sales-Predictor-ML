import { useState } from "react";
import axios from "axios";
import { Gamepad2, BarChart3, TrendingUp, Settings2 } from "lucide-react"; // Import icons
import styles from './App.module.css'

const App = () => {
  const [formData, setFormData] = useState({
    year: "",
    na_sales: "",
    eu_sales: "",
    jp_sales: "",
    other_sales: "",
    platform: "",
    genre: "",
    publisher: "",
  });

  const [predictedSales, setPredictedSales] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset error message

    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", formData, {
        headers: { "Content-Type": "application/json" },
      });
      setPredictedSales(response.data.prediction);
    } catch (error) {
      console.error("Error making prediction:", error);
      setErrorMessage("Failed to get prediction. Please check input values.");
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}> 
        <h1>The Game Sales Predictor</h1>
        <p>Empowering game developers and industry leaders with advanced analytics to forecast sales trends, identify market opportunities, and stay ahead in the world of gaming</p>
      </div>

      {/* Icons Section */}
      <div className={styles.iconsContainer}>
        <div className={styles.iconBox}><Gamepad2 size={40} className={styles.icon} /><p>Game Genre</p></div>
        <div className={styles.iconBox}><BarChart3 size={40} className={styles.icon} /><p>Market Trends</p></div>
        <div className={styles.iconBox}><TrendingUp size={40} className={styles.icon} /><p>Sales Prediction</p></div>
        <div className={styles.iconBox}><Settings2 size={40} className={styles.icon} /><p>AI Analysis</p></div>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputfield}>
          <input className={styles.input} type="number" name="year" placeholder="Year" onChange={handleChange} required />
        </div>

        <div className={styles.row}>
          <div className={styles.inputfield}>
            <input className={styles.input} type="number" step="0.01" name="na_sales" placeholder="NA Sales (millions)" onChange={handleChange} required />
          </div>
          <div className={styles.inputfield}>
            <input className={styles.input} type="number" step="0.01" name="eu_sales" placeholder="EU Sales (millions)" onChange={handleChange} required />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.inputfield}>
            <input className={styles.input} type="number" step="0.01" name="jp_sales" placeholder="JP Sales (millions)" onChange={handleChange} required />
          </div>
          <div className={styles.inputfield}>
            <input className={styles.input} type="number" step="0.01" name="other_sales" placeholder="Other Sales (millions)" onChange={handleChange} required />
          </div>
        </div>

        <div className={styles.inputfield}>
          <select className={styles.input} name="platform" onChange={handleChange} required>
            <option value="">Select Platform</option>
            <option value="PS2">PS2</option>
            <option value="PS3">PS3</option>
            <option value="X360">X360</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className={styles.inputfield}>
          <select className={styles.input} name="genre" onChange={handleChange} required>
            <option value="">Select Genre</option>
            <option value="Action">Action</option>
            <option value="Shooter">Shooter</option>
            <option value="Sports">Sports</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className={styles.inputfield}>
          <select className={styles.input} name="publisher" onChange={handleChange} required>
            <option value="">Select Publisher</option>
            <option value="Electronic Arts">Electronic Arts</option>
            <option value="Nintendo">Nintendo</option>
            <option value="Sony Computer Entertainment">Sony Computer Entertainment</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className={styles.inputfield}>
          <button type="submit" className={styles.btn}>Predict Sales</button>
        </div>
      </form>

      {predictedSales !== null && (
        <div className={styles.result}>
          <p>Estimated Sales: <span>{predictedSales}</span> million copies</p>
        </div>
      )}

      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
    </div>
  );
};

export default App;