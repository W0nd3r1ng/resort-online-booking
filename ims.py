import tkinter as tk
from tkinter import ttk, messagebox, filedialog
import csv
import os
from datetime import datetime

class InventoryManagementSystem:
    # ... other methods ...

    def setup_register_form(self, frame, register_type):
        form_frame = tk.Frame(frame, bg="#d0e8c3", bd=1, relief="solid", padx=20, pady=20)
        form_frame.pack(fill="both", expand=True, padx=50, pady=30)

        title_label = tk.Label(form_frame, text=register_type, font=("Arial", 14, "bold"), bg="#d0e8c3")
        title_label.grid(row=0, column=0, columnspan=3, pady=(0, 20))

        fields = [("Name:", "name")]
        if register_type == "Item":
            fields += [("Quantity:", "quantity")]
        fields += [("Number:", "number")]
        if register_type == "Operator":
            fields += [("Username:", "username"), ("Password:", "password")]

        row = 1
        for label_text, field_name in fields:
            label = tk.Label(form_frame, text=label_text, font=("Arial", 12), bg="#d0e8c3")
            label.grid(row=row, column=0, sticky="w", padx=10, pady=10)
            entry = tk.Entry(form_frame, font=("Arial", 12), width=30)
            entry.grid(row=row, column=1, padx=10, pady=10)
            setattr(self, f"{register_type.lower()}_{field_name}_entry", entry)
            row += 1

        # Section dropdown for Item
        if register_type == "Item":
            section_label = tk.Label(form_frame, text="Section:", font=("Arial", 12), bg="#d0e8c3")
            section_label.grid(row=row, column=0, sticky="w", padx=10, pady=10)
            section_values = self.get_existing_sections()
            section_values.append("Add new section...")
            self.item_section_var = tk.StringVar()
            section_combobox = ttk.Combobox(form_frame, textvariable=self.item_section_var, values=section_values, state="readonly", width=28)
            section_combobox.grid(row=row, column=1, padx=10, pady=10)
            section_combobox.set(section_values[0] if section_values else "")
            self.item_new_section_entry = tk.Entry(form_frame, font=("Arial", 12), width=30)
            self.item_new_section_entry.grid(row=row+1, column=1, padx=10, pady=10)
            self.item_new_section_entry.grid_remove()
            def on_section_change(event):
                if self.item_section_var.get() == "Add new section...":
                    self.item_new_section_entry.grid()
                else:
                    self.item_new_section_entry.grid_remove()
            section_combobox.bind("<<ComboboxSelected>>", on_section_change)
            setattr(self, "item_section_combobox", section_combobox)
            setattr(self, "item_new_section_entry", self.item_new_section_entry)
            row += 2
        else:
            row += 1

        # ... barcode and button code ...

    def get_existing_sections(self):
        sections = set()
        item_file = 'data/items/items.csv'
        if os.path.exists(item_file):
            try:
                with open(item_file, 'r', encoding='utf-8') as file:
                    reader = csv.DictReader(file)
                    for row in reader:
                        section = row.get('Section', '').strip()
                        if section:
                            sections.add(section)
            except Exception:
                pass
        return sorted(sections)

    def register_entry(self, register_type):
        name = getattr(self, f"{register_type.lower()}_name_entry").get().strip()
        number = getattr(self, f"{register_type.lower()}_number_entry").get().strip()
        barcode_label = getattr(self, f"{register_type.lower()}_barcode_label", None)
        barcode = getattr(barcode_label, 'barcode_value', '') if barcode_label else ''
        if not name or not number or not barcode:
            messagebox.showerror("Error", "Please fill all fields and generate a barcode")
            return
        additional_fields = {}
        if register_type == "Item":
            quantity = getattr(self, f"{register_type.lower()}_quantity_entry").get().strip()
            section = self.item_section_var.get() if hasattr(self, 'item_section_var') else ""
            if section == "Add new section...":
                section = self.item_new_section_entry.get().strip()
            if not quantity or not quantity.isdigit():
                messagebox.showerror("Error", "Please enter a valid quantity")
                return
            if not section:
                messagebox.showerror("Error", "Please enter a section/group for the item")
                return
            additional_fields["Quantity"] = quantity
            additional_fields["Section"] = section
            additional_fields["Item Borrowed"] = "0"
        # ... rest of register logic ...
        if register_type == "Item":
            getattr(self, f"{register_type.lower()}_quantity_entry").delete(0, 'end')
            self.item_section_combobox.set("")
            self.item_new_section_entry.delete(0, 'end')
            self.item_new_section_entry.grid_remove()
        # ... rest of register_entry ...

    def load_log_data(self, file_path, tree):
        for item in tree.get_children():
            tree.delete(item)
        if not os.path.exists(file_path):
            return
        if "items.csv" in file_path:
            items_by_section = {}
            with open(file_path, 'r') as file:
                reader = csv.reader(file)
                headers = next(reader)
                for row in reader:
                    while len(row) < 6:
                        row.append("0")
                    section = row[4]
                    items_by_section.setdefault(section, []).append(row)
            for section, items in items_by_section.items():
                tree.insert("", "end", values=(f"Section: {section}", "", "", "", "", ""), tags=("section_header",))
                for row in items:
                    tree.insert("", "end", values=row)
            tree.tag_configure("section_header", background="#e0f2c0", font=("Arial", 11, "bold"))
            return
        # ... rest of load_log_data ...