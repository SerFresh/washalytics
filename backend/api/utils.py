import pandas as pd

EXCEL_PATH = r"C:\Users\Modmint\Desktop\washalytics\washalytics.xlsx"

def load_excel(sheet_name):
    """ โหลดข้อมูลจาก Excel ตาม sheet ที่ระบุ """
    try:
        df = pd.read_excel(EXCEL_PATH, sheet_name=sheet_name)
        return df
    except Exception as e:
        print(f"Error loading {sheet_name}: {e}")
        return None

def save_excel(df, sheet_name):
    """ บันทึกข้อมูลกลับไปยัง Excel """
    try:
        with pd.ExcelWriter(EXCEL_PATH, mode='a', if_sheet_exists='replace') as writer:
            df.to_excel(writer, sheet_name=sheet_name, index=False)
    except Exception as e:
        print(f"Error saving {sheet_name}: {e}")
