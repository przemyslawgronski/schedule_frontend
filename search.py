import os
import re

def count_levels(most_parent_path, nested_path, count=0):
    if not most_parent_path in nested_path:
        print("most_parent_path is not part of nested_path!")
        return -1
    if most_parent_path == nested_path:
        return count
    count += 1
    return count_levels(most_parent_path, os.path.split(nested_path)[0], count)

def search_text_in_file(extension=".js", exclude_path_words = None):
    path_dir = os.path.dirname(__file__)
    
    for root, _, files in os.walk(path_dir):

        if any(exclude in root for exclude in exclude_path_words):
            continue

        # Skip nested level 5
        if root != path_dir: # Skip top-most iteration
            if count_levels(path_dir, root)>5:
                continue

        for file in files:
            if file.endswith(extension):
                full_path = os.path.join(root, file)
                
                try:
                    with open(full_path, encoding='utf8') as file:
                        content = file.read()
                        # results = re.findall(".{0,20}\{\}{0,30}", content)
                        # if(results):
                        #     for result in results:
                        #         print(result)
                        if "TODO" in content:
                            print(full_path)
                except UnicodeDecodeError as e:
                    print("Error reading file: " + full_path)
                    print(e)


print("----------")
search_text_in_file(exclude_path_words=["@","node_modules", "static", "build", "public"])
print("----------")