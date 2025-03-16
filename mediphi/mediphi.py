#################################################
# Author        : Philip Varghese Modayil
# Last Update   : 16-03-2025
# Topic         : Medical Assistant
#################################################

#####################################################################################
#                                     Imports
#####################################################################################
import pdfplumber

def processPDF(pdf_path: str) -> None:
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            pass