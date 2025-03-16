#################################################
# Author        : Philip Varghese Modayil
# Last Update   : 16-03-2025
# Topic         : Medical Assistant
#################################################

#####################################################################################
#                                     Imports
#####################################################################################
import pymupdf4llm
from .contextualizer import MediLMContextualizer

from dataclasses import dataclass

@dataclass(frozen=True)
class Patient:
    Name: str
    age: int
    sex: str
    
def processPDF(patient: Patient,
               pdf_path: str, 
               local_llm: str,
               domain: str = "General Practitioner") -> str:
    # Convert the full pdf into markdown format
    pdf_markdown: str = pymupdf4llm.to_markdown(pdf_path)
    
    llm_model: MediLMContextualizer = MediLMContextualizer(domain=domain,
                                                           local_llm=local_llm) 
    report_summary: str = llm_model.contextualizeDataWithLM(age=patient.age,sex=patient.sex,content_to_summarize=pdf_markdown)
    
    return report_summary