import subprocess
import platform

if platform.system() == "Linux":
    subprocess.check_call(["sudo", "apt", "install", "python3-tk"])

subprocess.check_call(["pip", "install", "-r", "requirements.txt"])