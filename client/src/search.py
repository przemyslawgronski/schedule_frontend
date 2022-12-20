import os
import re
import pandas as pd


def count_levels(most_parent_path, nested_path, count=0):
    if not most_parent_path in nested_path:
        print("most_parent_path is not part of nested_path!")
        return -1
    if most_parent_path == nested_path:
        return count
    count += 1
    return count_levels(most_parent_path, os.path.split(nested_path)[0], count)



def search_text_in_file(extensions=None, text_in_filename=None, searched_text=None, exclude_path_words = None, how_deep=5):

    if not any([extensions, text_in_filename, searched_text]):
        print("Przynajmniej jeden z argumentów: [extension, text_in_filename, searched_text] musi być podany ")
        return
        

    path_dir = os.path.dirname(__file__)
    
    for root, _, files in os.walk(path_dir):

        if exclude_path_words:
            if any([exclude in root for exclude in exclude_path_words]):
                continue

        # Skip nested level 5
        if root != path_dir: # Skip top-most iteration
            if count_levels(path_dir, root)>how_deep:
                continue

        for file_name in files:

            if file_name.startswith("~$"): # ~$ - Do not read temporary file
                continue # Następny plik
            
            if extensions: # Rozszerzenia zostały podane
                if not any([file_name.endswith(ext) for ext in extensions]): # Plik nie ma rozszerzenia z listy
                    continue # Następny plik

            if text_in_filename: # Wyszukiwany jest tekst w nazwach plików
                if not text_in_filename in file_name: # Tekstu nie ma w nazwie pliku
                    continue # Kolejny

            print(f"Current file: {file_name}")
            full_path = os.path.join(root, file_name)

            if not searched_text: # Nie podano tekstu do wyszukiwania 
                continue # Nie przejmuj się co jest dalej

            # Jeżeli jest to plik excela to użyj pandas
            if any([file_name.endswith(ext) for ext in [".xlsx", ".xls"]]):
                for num, row in pd.read_excel(full_path, header=None).iterrows():
                    if searched_text in str(row):
                        print("Znaleziono:")
                        print(f"  Wiersz: {num+1}") # Wiersze w excelu są liczone od 1, nie od 0
                        print(f"  plik: {full_path}")

            # Pliki tekstowe wczytaj bezpośrednio
            if any([file_name.endswith(ext) for ext in [".txt", ".js", ".html", ".py"]]):
                with open(full_path, encoding="utf8") as file:
                    content = file.read()
                    if searched_text in content:
                        print("Znaleziono")
                        print(f"  plik: {full_path}")
                        # results = re.findall(".{0,20}"+ searched_text +".{0,30}", content)
                        # if(results):
                        #     for result in results:
                        #         print(result)

search_text_in_file(extensions=".js", searched_text="toValuesArr")

# Wyszukaj pliki xlsx z tekstem "Adresy do" w nazwie pliku i tekstem "Świerzowska" w treści
# search_text_in_file(text_in_filename="Adresy do", searched_text="Świerzowska", extensions=".xlsx")

# Wyszukaj pliki xlsx z tekstem "Adresy do" w nazwie pliku
# search_text_in_file(text_in_filename="Adresy do", extensions=".xlsx")

# Wyszukaj pliki xlsx, nie uwzględniaj ścieżek z ciągami znaków : "2021.10.07" i "2021.10.21"
# search_text_in_file(extensions=".xlsx", exclude_path_words=["2021.10.07", "2021.10.21"])

# Wyszukaj pliki txt ze słowem "pdompq[wdmj" w treści i wyszukaj maksymalnie 9 folderów w głąb, domyślnie jest do 5
# search_text_in_file(searched_text="pdompq[wdmj", extensions=[".txt", ".js"], how_deep=9)

# search_text_in_file() # Przynajmniej jeden z argumentów: [extension, text_in_filename, searched_text] musi być podany