#################################################
# Author        : Philip Varghese Modayil
# Last Update   : 16-03-2025
# Topic         : Medical Assistant
#################################################

#####################################################################################
#                                     Imports
#####################################################################################
import uuid
import pdfplumber
import pandas as pd
from ._types import ExtractedItems

def processPDF(pdf_path: str) -> None:
    extracted_items: list[ExtractedItems] = []
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            page_content_text: str = page.extract_text()
            page_content_tables:list[list[list]] = page.extract_tables()
            
            # Will only go through loop if tables exist
            for table_id,table in enumerate(page_content_tables):
                # Convert extracted table to pandas dataframe
                df: pd.DataFrame = pd.DataFrame(table[1:], columns=table[0])  # Create DataFrame