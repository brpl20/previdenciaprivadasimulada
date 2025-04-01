#!/bin/bash

# Directory containing MDX files
BLOG_DIR="/Users/brpl20/code/sftown-pellizzetti-associados-fe/src/content/blog"

# Required front matter fields
REQUIRED_FIELDS=("title" "layout" "permalink" "description" "author" "date" "published" "tags")

# Function to check if a file has complete front matter
check_frontmatter() {
    local file=$1
    local missing_fields=()
    
    # Check if file begins with front matter
    if ! grep -q "^---" "$file"; then
        echo "ERROR: $file is missing front matter delimiters (---)"
        return 1
    fi
    
    # Check for required fields
    for field in "${REQUIRED_FIELDS[@]}"; do
        if ! grep -q "^$field:" "$file"; then
            missing_fields+=("$field")
        fi
    done
    
    if [ ${#missing_fields[@]} -gt 0 ]; then
        echo "WARNING: $file is missing these front matter fields: ${missing_fields[*]}"
        return 1
    fi
    
    return 0
}

# Function to extract title from front matter
get_title() {
    local file=$1
    # Extract title between quotes from the front matter
    title=$(grep '^title:' "$file" | sed -E 's/title: "(.*)"/\1/')
    echo "$title"
}

# Function to remove H1 that matches title
remove_matching_h1() {
    local file=$1
    local title=$2
    local escaped_title=$(echo "$title" | sed 's/[\/&]/\\&/g')
    
    # Check if there's an H1 that matches the title
    if grep -q "^# $escaped_title" "$file"; then
        # Create a temporary file
        local temp_file=$(mktemp)
        
        # Copy file content without the matching H1
        sed "/^# $escaped_title/d" "$file" > "$temp_file"
        
        # Replace original file
        mv "$temp_file" "$file"
        
        echo "REMOVED H1: \"$title\" from $file"
        return 0
    fi
    
    return 1
}

# Main script execution
echo "Checking MDX files in $BLOG_DIR..."
echo "--------------------------------"

# Count variables
total_files=0
fixed_files=0
incomplete_files=0

# Process each MDX file
for file in "$BLOG_DIR"/*.mdx; do
    if [ -f "$file" ]; then
        total_files=$((total_files + 1))
        filename=$(basename "$file")
        
        echo "Processing: $filename"
        
        # Check front matter
        if check_frontmatter "$file"; then
            # Get title from front matter
            title=$(get_title "$file")
            
            # Remove H1 if it matches title
            if [ -n "$title" ]; then
                if remove_matching_h1 "$file" "$title"; then
                    fixed_files=$((fixed_files + 1))
                fi
            else
                echo "WARNING: Could not extract title from $file"
            fi
        else
            incomplete_files=$((incomplete_files + 1))
        fi
        
        echo "--------------------------------"
    fi
done

# Summary
echo "SUMMARY:"
echo "Total MDX files: $total_files"
echo "Files with H1 headers removed: $fixed_files"
echo "Files with incomplete front matter: $incomplete_files"
