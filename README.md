# Enhancing Visibility in Hazy Images and Videos

A deep learning-based system for removing haze from single images and video streams using a Residual CNN and transmission estimation network. Trained on NYU-Depth V2 and RESIDE datasets.

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

| Hazy Input | Dehazed Output |
|------------|----------------|
| ![input](outputs/hazy_sample.png) | ![output](outputs/clear_output.png) |

## 📦 Installation

```bash
git clone https://github.com/yourusername/haze-removal-deep-learning-NYU2.git
cd haze-removal-deep-learning-NYU2
pip install -r requirements.txt
