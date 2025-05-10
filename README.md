# Enhancing Visibility in Hazy Images and Videos

A deep learning-based system for removing haze from single images and video streams using a Residual CNN and transmission estimation network. Trained on NYU-Depth V2 and RESIDE datasets.

## 🌐 Web Interface
This project includes a fully functional web application built using Flask, HTML/CSS, and JavaScript, allowing users to upload hazy images and receive clear, dehazed outputs in real time.

- Upload images from your device
- View input and output side-by-side
- Supports real-time inference
| ![Web-Page-Preview](https://raw.githubusercontent.com/adityasinha513/haze-removal-deep-learning-NYU2/main/Web%20Page/Web-page-preview.png) |

## ✨ Features

- Depth-aware haze simulation using physical modeling
- Residual-based CNN for accurate dehazing
- Transmission network to estimate haze intensity
- Real-time web interface built using Flask & OpenCV
- Evaluation using PSNR, SSIM, and RMSE

## 📁 Project Structure

- `notebooks/` – Data preprocessing, training & testing notebooks
- `web page/` – HTML/CSS/JS-based UI for image upload and result viewing
- `models/` – Pretrained `.h5` model weights (optional)
- `outputs/` – Sample dehazing results
  
## 📷 Sample Results

| Hazy Input | Ground Truth | Dehazed Output |
|------------|--------------|----------------|
| ![input](https://raw.githubusercontent.com/adityasinha513/haze-removal-deep-learning-NYU2/main/Outputs/in/0.jpg) | ![gt](https://raw.githubusercontent.com/adityasinha513/haze-removal-deep-learning-NYU2/main/Outputs/in/0_clean.jpg) | ![dehaze](https://raw.githubusercontent.com/adityasinha513/haze-removal-deep-learning-NYU2/main/Outputs/in/0_dehaze.jpg) |



## 📦 Installation

```bash
git clone https://github.com/yourusername/haze-removal-deep-learning-NYU2.git
cd haze-removal-deep-learning-NYU2
pip install -r requirements.txt
