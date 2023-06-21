import subprocess
import platform

if platform.system() == "Linux":
    subprocess.check_call(["pyinstaller", "--onefile", "CladoGraph.py"])
else:
     subprocess.check_call(["pyinstaller", "--onefile", "-w", "CladoGraph.py"])