#!/usr/bin/env python3
"""
Setup script for Book Search Application
This script helps set up the development environment quickly.
"""

import os
import sys
import subprocess
import platform

def run_command(command, description):
    """Run a command and handle errors"""
    print(f"🔄 {description}...")
    try:
        result = subprocess.run(command, shell=True, check=True, capture_output=True, text=True)
        print(f"✅ {description} completed successfully")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ {description} failed: {e}")
        print(f"Error output: {e.stderr}")
        return False

def check_python_version():
    """Check if Python version is compatible"""
    version = sys.version_info
    if version.major < 3 or (version.major == 3 and version.minor < 8):
        print("❌ Python 3.8 or higher is required")
        return False
    print(f"✅ Python {version.major}.{version.minor}.{version.micro} is compatible")
    return True

def check_node_version():
    """Check if Node.js is installed"""
    try:
        result = subprocess.run(['node', '--version'], capture_output=True, text=True)
        print(f"✅ Node.js {result.stdout.strip()} is installed")
        return True
    except FileNotFoundError:
        print("❌ Node.js is not installed. Please install Node.js v16 or higher")
        return False

def setup_backend():
    """Setup the Flask backend"""
    print("\n🐍 Setting up Python backend...")
    
    # Check if virtual environment exists
    venv_path = os.path.join('api', 'venv')
    if not os.path.exists(venv_path):
        print("📦 Creating virtual environment...")
        if not run_command(f"cd api && python -m venv venv", "Creating virtual environment"):
            return False
    
    # Activate virtual environment and install dependencies
    if platform.system() == "Windows":
        activate_cmd = "api\\venv\\Scripts\\activate"
        pip_cmd = "api\\venv\\Scripts\\pip"
    else:
        activate_cmd = "source api/venv/bin/activate"
        pip_cmd = "api/venv/bin/pip"
    
    if not run_command(f"{pip_cmd} install -r api/requirements.txt", "Installing Python dependencies"):
        return False
    
    print("✅ Backend setup completed")
    return True

def setup_frontend():
    """Setup the React frontend"""
    print("\n⚛️ Setting up React frontend...")
    
    if not run_command("npm install", "Installing Node.js dependencies"):
        return False
    
    print("✅ Frontend setup completed")
    return True

def main():
    """Main setup function"""
    print("🚀 Book Search Application Setup")
    print("=" * 40)
    
    # Check prerequisites
    if not check_python_version():
        return False
    
    if not check_node_version():
        return False
    
    # Setup backend
    if not setup_backend():
        return False
    
    # Setup frontend
    if not setup_frontend():
        return False
    
    print("\n🎉 Setup completed successfully!")
    print("\n📖 To start the application:")
    print("1. Start the backend: npm run api")
    print("2. Start the frontend: npm run dev")
    print("3. Open http://localhost:5173 in your browser")
    print("\n📚 Happy book searching!")

if __name__ == "__main__":
    main() 