# README (UPDATED)

# 🤖 Automation Script for logging into LPU Wifi

This script is tested with Google Chrome <b> Version 132.0.6834.84 </b> (Official Build) (64-bit).
<br>

### 🛑 **Create a text file and rename it with extension as .env**

<br>If `pip` is not installed, then install `pip`.
<br>

This is a Python script that uses some bootstrapping logic to install pip.

Download the script `get-pip.py`, from [this link.](https://bootstrap.pypa.io/get-pip.py)

Open a terminal/command prompt, `cd` to the folder containing the `get-pip.py` file and run:

`C:> py get-pip.py`
<br>Then, clone the repository with `git clone https://github.com/petrioteer/lpu-wifi-automate-login.git` in your home directory.
<br>

Place the folder in your `C:` drive.
<br>
Go inside the folder and put your RegNo and Password for wifi login inside `.env` file.

After that, open a terminal at that location and run the following command:<br>

`pip install requirements.txt`
<br>
## 👨‍💻 Make the Script run on Startup

- Create a TXT file and mention the location of `automate_login.py` like `cd /d C:\lpu-wifiautomate-login`. It is the directory where you have saved your `automate_login.py` script in.
- In the next line, write `python automate_login.py`.
- Now, save the text file but replace the extension `.txt` with `.bat`, this will create a windows batch file.
- Using Windows+R shortcut key to open Run, type **`shell:startup`** in the text box and click ok.
- It will open a folder where you can put your `.bat` file that you created.

## Congrats, you just saved yourself the hassle of logging in again and again. 🥳🥳
