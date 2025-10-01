// Basic JavaScript functionality for the website

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.toc a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add loading animation for images
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.addEventListener('error', function() {
            // Handle missing images gracefully
            this.style.display = 'block';
            this.style.backgroundColor = '#f8f9fa';
            this.style.border = '2px dashed #ddd';
            this.style.minHeight = '200px';
            this.style.position = 'relative';
            
            // Add placeholder text
            const placeholder = document.createElement('div');
            placeholder.textContent = 'Image placeholder - ' + this.alt;
            placeholder.style.position = 'absolute';
            placeholder.style.top = '50%';
            placeholder.style.left = '50%';
            placeholder.style.transform = 'translate(-50%, -50%)';
            placeholder.style.color = '#999';
            placeholder.style.textAlign = 'center';
            
            this.parentNode.style.position = 'relative';
            this.parentNode.appendChild(placeholder);
        });
    });

    // Add copy functionality to citation
    const citationBox = document.querySelector('.citation-box pre');
    if (citationBox) {
        citationBox.addEventListener('click', function() {
            const text = this.textContent;
            navigator.clipboard.writeText(text).then(function() {
                // Show temporary feedback
                const originalText = citationBox.textContent;
                citationBox.style.backgroundColor = '#27ae60';
                setTimeout(() => {
                    citationBox.style.backgroundColor = '#2c3e50';
                }, 1000);
            });
        });
        
        // Add click hint
        citationBox.style.cursor = 'pointer';
        citationBox.title = 'Click to copy citation';
    }

    // Add fade-in animation for sections
    const sections = document.querySelectorAll('.section');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});

// Function to update the page title and content dynamically
function updateProjectInfo(projectData) {
    if (projectData.title) {
        document.querySelector('.title').textContent = projectData.title;
        document.title = projectData.title;
    }
    
    if (projectData.authors) {
        const authorsContainer = document.querySelector('.authors');
        authorsContainer.innerHTML = '';
        projectData.authors.forEach(author => {
            const span = document.createElement('span');
            span.className = 'author';
            span.textContent = author;
            authorsContainer.appendChild(span);
        });
    }
    
    if (projectData.affiliation) {
        document.querySelector('.affiliation').textContent = projectData.affiliation;
    }
    
    if (projectData.date) {
        document.querySelector('.date span').textContent = projectData.date;
    }
    
    if (projectData.abstract) {
        document.querySelector('.abstract').innerHTML = projectData.abstract;
    }
}

// Example usage:
// updateProjectInfo({
//     title: "My Amazing Project: Revolutionary Approach to AI",
//     authors: ["John Doe", "Jane Smith", "Bob Johnson"],
//     affiliation: "University of Technology",
//     date: "December 2024",
//     abstract: "We present <strong>My Amazing Project</strong>, a novel approach..."
// });

// Image Edit Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
    const strengthSlider = document.getElementById('strength-slider');
    const resultImage = document.getElementById('result-image');
    
    // Define the mapping of slider values to pre-saved images from aesthetic_model3 folder
    const imageMapping = {
        0: {
            src: 'assets/aesthetic_model3/image_0.png',
            caption: 'Original image (0.0 edit strength)'
        },
        8: {
            src: 'assets/aesthetic_model3/image_1.png',
            caption: 'Light editing effect (0.08 edit strength)'
        },
        17: {
            src: 'assets/aesthetic_model3/image_2.png',
            caption: 'Light editing effect (0.17 edit strength)'
        },
        25: {
            src: 'assets/aesthetic_model3/image_3.png',
            caption: 'Moderate editing effect (0.25 edit strength)'
        },
        33: {
            src: 'assets/aesthetic_model3/image_4.png',
            caption: 'Moderate editing effect (0.33 edit strength)'
        },
        42: {
            src: 'assets/aesthetic_model3/image_5.png',
            caption: 'Balanced editing effect (0.42 edit strength)'
        },
        50: {
            src: 'assets/aesthetic_model3/image_6.png',
            caption: 'Balanced editing effect (0.5 edit strength)'
        },
        58: {
            src: 'assets/aesthetic_model3/image_7.png',
            caption: 'Strong editing effect (0.58 edit strength)'
        },
        67: {
            src: 'assets/aesthetic_model3/image_8.png',
            caption: 'Strong editing effect (0.67 edit strength)'
        },
        75: {
            src: 'assets/aesthetic_model3/image_9.png',
            caption: 'Very strong editing effect (0.75 edit strength)'
        },
        83: {
            src: 'assets/aesthetic_model3/image_10.png',
            caption: 'Very strong editing effect (0.83 edit strength)'
        },
        92: {
            src: 'assets/aesthetic_model3/image_11.png',
            caption: 'Near maximum editing effect (0.92 edit strength)'
        },
        100: {
            src: 'assets/aesthetic_model3/image_11.png',
            caption: 'Maximum editing effect (1.0 edit strength)'
        }
    };
    
    if (strengthSlider && resultImage) {
        // Update display and image when slider changes
        strengthSlider.addEventListener('input', function() {
            const sliderValue = parseInt(this.value);
            
            // Find the closest available image
            const availableValues = Object.keys(imageMapping).map(Number).sort((a, b) => a - b);
            let closestValue = availableValues[0];
            
            for (let i = 0; i < availableValues.length; i++) {
                if (Math.abs(availableValues[i] - sliderValue) < Math.abs(closestValue - sliderValue)) {
                    closestValue = availableValues[i];
                }
            }
            
            const imageData = imageMapping[closestValue];
            
            if (imageData) {
                // Add subtle fade effect during image change
                resultImage.style.opacity = '0.8';
                
                // Change image source
                resultImage.src = imageData.src;
                
                // Handle image load to restore opacity
                resultImage.onload = function() {
                    this.style.opacity = '1';
                };
                
                // Handle image error (fallback to first teaser image)
                resultImage.onerror = function() {
                    this.src = 'assets/teaser/row_00_col_00.png';
                    this.style.opacity = '1';
                };
            }
        });
        
        // Initialize with the default value
        const initialValue = parseInt(strengthSlider.value);
        
        // Set initial image
        const initialImageData = imageMapping[initialValue];
        if (initialImageData) {
            resultImage.src = initialImageData.src;
        }
    }
});

// Function to add custom image mappings (for easy customization)
function updateImageMapping(customMapping) {
    // This allows you to easily update the image mappings
    // Example usage:
    // updateImageMapping({
    //     0: { src: 'assets/my_original.png', caption: 'My original image' },
    //     50: { src: 'assets/my_edit_50.png', caption: 'My 50% edit' },
    //     100: { src: 'assets/my_edit_100.png', caption: 'My full edit' }
    // });
    
    Object.assign(imageMapping, customMapping);
}

// Function to preload all images for smooth transitions
function preloadImages() {
    const imagePaths = [
        'assets/aesthetic_model3/image_0.png',
        'assets/aesthetic_model3/image_1.png',
        'assets/aesthetic_model3/image_2.png',
        'assets/aesthetic_model3/image_3.png',
        'assets/aesthetic_model3/image_4.png',
        'assets/aesthetic_model3/image_5.png',
        'assets/aesthetic_model3/image_6.png',
        'assets/aesthetic_model3/image_7.png',
        'assets/aesthetic_model3/image_8.png',
        'assets/aesthetic_model3/image_9.png',
        'assets/aesthetic_model3/image_10.png',
        'assets/aesthetic_model3/image_11.png'
    ];
    
    imagePaths.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Preload images when page loads
document.addEventListener('DOMContentLoaded', preloadImages);
document.addEventListener('DOMContentLoaded', preloadExampleImages);
document.addEventListener('DOMContentLoaded', preloadResultImages);

// Function to preload example images for smooth transitions
function preloadExampleImages() {
    const exampleImagePaths = [
        // Chair Apple Transform Floor images (12 images)
        'assets/chair_apple_Transform_the_floor__1/image_0.png',
        'assets/chair_apple_Transform_the_floor__1/image_1.png',
        'assets/chair_apple_Transform_the_floor__1/image_2.png',
        'assets/chair_apple_Transform_the_floor__1/image_3.png',
        'assets/chair_apple_Transform_the_floor__1/image_4.png',
        'assets/chair_apple_Transform_the_floor__1/image_5.png',
        'assets/chair_apple_Transform_the_floor__1/image_6.png',
        'assets/chair_apple_Transform_the_floor__1/image_7.png',
        'assets/chair_apple_Transform_the_floor__1/image_8.png',
        'assets/chair_apple_Transform_the_floor__1/image_9.png',
        'assets/chair_apple_Transform_the_floor__1/image_10.png',
        'assets/chair_apple_Transform_the_floor__1/image_11.png',
        // Enfield Transform Scene images (12 images)
        'assets/enfield3_Transform_the_scene__0/image_0.png',
        'assets/enfield3_Transform_the_scene__0/image_1.png',
        'assets/enfield3_Transform_the_scene__0/image_2.png',
        'assets/enfield3_Transform_the_scene__0/image_3.png',
        'assets/enfield3_Transform_the_scene__0/image_4.png',
        'assets/enfield3_Transform_the_scene__0/image_5.png',
        'assets/enfield3_Transform_the_scene__0/image_6.png',
        'assets/enfield3_Transform_the_scene__0/image_7.png',
        'assets/enfield3_Transform_the_scene__0/image_8.png',
        'assets/enfield3_Transform_the_scene__0/image_9.png',
        'assets/enfield3_Transform_the_scene__0/image_10.png',
        'assets/enfield3_Transform_the_scene__0/image_11.png',
        // Model1 Grow Hair images (12 images)
        'assets/model1_boot_Grow_her_hairs_to_be_0/image_0.png',
        'assets/model1_boot_Grow_her_hairs_to_be_0/image_1.png',
        'assets/model1_boot_Grow_her_hairs_to_be_0/image_2.png',
        'assets/model1_boot_Grow_her_hairs_to_be_0/image_3.png',
        'assets/model1_boot_Grow_her_hairs_to_be_0/image_4.png',
        'assets/model1_boot_Grow_her_hairs_to_be_0/image_5.png',
        'assets/model1_boot_Grow_her_hairs_to_be_0/image_6.png',
        'assets/model1_boot_Grow_her_hairs_to_be_0/image_7.png',
        'assets/model1_boot_Grow_her_hairs_to_be_0/image_8.png',
        'assets/model1_boot_Grow_her_hairs_to_be_0/image_9.png',
        'assets/model1_boot_Grow_her_hairs_to_be_0/image_10.png',
        'assets/model1_boot_Grow_her_hairs_to_be_0/image_11.png',
        // Model1 Make Chubby images (12 images)
        'assets/model1_boot_Make_her_chubby_and__1/image_0.png',
        'assets/model1_boot_Make_her_chubby_and__1/image_1.png',
        'assets/model1_boot_Make_her_chubby_and__1/image_2.png',
        'assets/model1_boot_Make_her_chubby_and__1/image_3.png',
        'assets/model1_boot_Make_her_chubby_and__1/image_4.png',
        'assets/model1_boot_Make_her_chubby_and__1/image_5.png',
        'assets/model1_boot_Make_her_chubby_and__1/image_6.png',
        'assets/model1_boot_Make_her_chubby_and__1/image_7.png',
        'assets/model1_boot_Make_her_chubby_and__1/image_8.png',
        'assets/model1_boot_Make_her_chubby_and__1/image_9.png',
        'assets/model1_boot_Make_her_chubby_and__1/image_10.png',
        'assets/model1_boot_Make_her_chubby_and__1/image_11.png',
        // Model2 Reimagine Scene images (12 images)
        'assets/model2_Reimagine_the_scene__1/image_0.png',
        'assets/model2_Reimagine_the_scene__1/image_1.png',
        'assets/model2_Reimagine_the_scene__1/image_2.png',
        'assets/model2_Reimagine_the_scene__1/image_3.png',
        'assets/model2_Reimagine_the_scene__1/image_4.png',
        'assets/model2_Reimagine_the_scene__1/image_5.png',
        'assets/model2_Reimagine_the_scene__1/image_6.png',
        'assets/model2_Reimagine_the_scene__1/image_7.png',
        'assets/model2_Reimagine_the_scene__1/image_8.png',
        'assets/model2_Reimagine_the_scene__1/image_9.png',
        'assets/model2_Reimagine_the_scene__1/image_10.png',
        'assets/model2_Reimagine_the_scene__1/image_11.png',
        // No Lamp Turn On Light images (12 images)
        'assets/no_lamp_Turn_on_the_hanging__2/image_0.png',
        'assets/no_lamp_Turn_on_the_hanging__2/image_1.png',
        'assets/no_lamp_Turn_on_the_hanging__2/image_2.png',
        'assets/no_lamp_Turn_on_the_hanging__2/image_3.png',
        'assets/no_lamp_Turn_on_the_hanging__2/image_4.png',
        'assets/no_lamp_Turn_on_the_hanging__2/image_5.png',
        'assets/no_lamp_Turn_on_the_hanging__2/image_6.png',
        'assets/no_lamp_Turn_on_the_hanging__2/image_7.png',
        'assets/no_lamp_Turn_on_the_hanging__2/image_8.png',
        'assets/no_lamp_Turn_on_the_hanging__2/image_9.png',
        'assets/no_lamp_Turn_on_the_hanging__2/image_10.png',
        'assets/no_lamp_Turn_on_the_hanging__2/image_11.png',
        // Red Panda Transform images (12 images)
        'assets/red_panda_Transform_the_panda__0/image_0.png',
        'assets/red_panda_Transform_the_panda__0/image_1.png',
        'assets/red_panda_Transform_the_panda__0/image_2.png',
        'assets/red_panda_Transform_the_panda__0/image_3.png',
        'assets/red_panda_Transform_the_panda__0/image_4.png',
        'assets/red_panda_Transform_the_panda__0/image_5.png',
        'assets/red_panda_Transform_the_panda__0/image_6.png',
        'assets/red_panda_Transform_the_panda__0/image_7.png',
        'assets/red_panda_Transform_the_panda__0/image_8.png',
        'assets/red_panda_Transform_the_panda__0/image_9.png',
        'assets/red_panda_Transform_the_panda__0/image_10.png',
        'assets/red_panda_Transform_the_panda__0/image_11.png',
        // Teaser Model2 Make Laugh images (12 images)
        'assets/teaser_model2_Make_him_laugh_0/image_0.png',
        'assets/teaser_model2_Make_him_laugh_0/image_1.png',
        'assets/teaser_model2_Make_him_laugh_0/image_2.png',
        'assets/teaser_model2_Make_him_laugh_0/image_3.png',
        'assets/teaser_model2_Make_him_laugh_0/image_4.png',
        'assets/teaser_model2_Make_him_laugh_0/image_5.png',
        'assets/teaser_model2_Make_him_laugh_0/image_6.png',
        'assets/teaser_model2_Make_him_laugh_0/image_7.png',
        'assets/teaser_model2_Make_him_laugh_0/image_8.png',
        'assets/teaser_model2_Make_him_laugh_0/image_9.png',
        'assets/teaser_model2_Make_him_laugh_0/image_10.png',
        'assets/teaser_model2_Make_him_laugh_0/image_11.png',
        // Teaser Model2 Transform Hair images (12 images)
        'assets/teaser_model2_Tranform_his_hairs_i_1/image_0.png',
        'assets/teaser_model2_Tranform_his_hairs_i_1/image_1.png',
        'assets/teaser_model2_Tranform_his_hairs_i_1/image_2.png',
        'assets/teaser_model2_Tranform_his_hairs_i_1/image_3.png',
        'assets/teaser_model2_Tranform_his_hairs_i_1/image_4.png',
        'assets/teaser_model2_Tranform_his_hairs_i_1/image_5.png',
        'assets/teaser_model2_Tranform_his_hairs_i_1/image_6.png',
        'assets/teaser_model2_Tranform_his_hairs_i_1/image_7.png',
        'assets/teaser_model2_Tranform_his_hairs_i_1/image_8.png',
        'assets/teaser_model2_Tranform_his_hairs_i_1/image_9.png',
        'assets/teaser_model2_Tranform_his_hairs_i_1/image_10.png',
        'assets/teaser_model2_Tranform_his_hairs_i_1/image_11.png',
        // Woody Make Fat images (12 images)
        'assets/woody_Make_him_fat_and_chu_1/image_0.png',
        'assets/woody_Make_him_fat_and_chu_1/image_1.png',
        'assets/woody_Make_him_fat_and_chu_1/image_2.png',
        'assets/woody_Make_him_fat_and_chu_1/image_3.png',
        'assets/woody_Make_him_fat_and_chu_1/image_4.png',
        'assets/woody_Make_him_fat_and_chu_1/image_5.png',
        'assets/woody_Make_him_fat_and_chu_1/image_6.png',
        'assets/woody_Make_him_fat_and_chu_1/image_7.png',
        'assets/woody_Make_him_fat_and_chu_1/image_8.png',
        'assets/woody_Make_him_fat_and_chu_1/image_9.png',
        'assets/woody_Make_him_fat_and_chu_1/image_10.png',
        'assets/woody_Make_him_fat_and_chu_1/image_11.png',
        // Person Blur Make Chubby images (12 images)
        'assets/person_blur_Make_her_chubby_and__0/image_0.png',
        'assets/person_blur_Make_her_chubby_and__0/image_1.png',
        'assets/person_blur_Make_her_chubby_and__0/image_2.png',
        'assets/person_blur_Make_her_chubby_and__0/image_3.png',
        'assets/person_blur_Make_her_chubby_and__0/image_4.png',
        'assets/person_blur_Make_her_chubby_and__0/image_5.png',
        'assets/person_blur_Make_her_chubby_and__0/image_6.png',
        'assets/person_blur_Make_her_chubby_and__0/image_7.png',
        'assets/person_blur_Make_her_chubby_and__0/image_8.png',
        'assets/person_blur_Make_her_chubby_and__0/image_9.png',
        'assets/person_blur_Make_her_chubby_and__0/image_10.png',
        'assets/person_blur_Make_her_chubby_and__0/image_11.png',
        // Glasses Alternative images (12 images)
        'assets/glasses_img4_0/image_0.png',
        'assets/glasses_img4_0/image_1.png',
        'assets/glasses_img4_0/image_2.png',
        'assets/glasses_img4_0/image_3.png',
        'assets/glasses_img4_0/image_4.png',
        'assets/glasses_img4_0/image_5.png',
        'assets/glasses_img4_0/image_6.png',
        'assets/glasses_img4_0/image_7.png',
        'assets/glasses_img4_0/image_8.png',
        'assets/glasses_img4_0/image_9.png',
        'assets/glasses_img4_0/image_10.png',
        'assets/glasses_img4_0/image_11.png'
    ];
    
    exampleImagePaths.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Function to preload result images for smooth transitions
function preloadResultImages() {
    const resultImagePaths = [
        // Aesthetic Model 3 images (12 images)
        'assets/aesthetic_model3/image_0.png',
        'assets/aesthetic_model3/image_1.png',
        'assets/aesthetic_model3/image_2.png',
        'assets/aesthetic_model3/image_3.png',
        'assets/aesthetic_model3/image_4.png',
        'assets/aesthetic_model3/image_5.png',
        'assets/aesthetic_model3/image_6.png',
        'assets/aesthetic_model3/image_7.png',
        'assets/aesthetic_model3/image_8.png',
        'assets/aesthetic_model3/image_9.png',
        'assets/aesthetic_model3/image_10.png',
        'assets/aesthetic_model3/image_11.png',
        // Horse Uncle images (12 images) - already loaded above
        // Man Jacket images (12 images) - already loaded above
        // Person Blur images (12 images) - already loaded above
        // Glasses images (12 images)
        'assets/glasses_img4/image_0.png',
        'assets/glasses_img4/image_1.png',
        'assets/glasses_img4/image_2.png',
        'assets/glasses_img4/image_3.png',
        'assets/glasses_img4/image_4.png',
        'assets/glasses_img4/image_5.png',
        'assets/glasses_img4/image_6.png',
        'assets/glasses_img4/image_7.png',
        'assets/glasses_img4/image_8.png',
        'assets/glasses_img4/image_9.png',
        'assets/glasses_img4/image_10.png',
        'assets/glasses_img4/image_11.png',
        // Panda images (12 images)
        'assets/panda/image_0.png',
        'assets/panda/image_1.png',
        'assets/panda/image_2.png',
        'assets/panda/image_3.png',
        'assets/panda/image_4.png',
        'assets/panda/image_5.png',
        'assets/panda/image_6.png',
        'assets/panda/image_7.png',
        'assets/panda/image_8.png',
        'assets/panda/image_9.png',
        'assets/panda/image_10.png',
        'assets/panda/image_11.png'
    ];
    
    resultImagePaths.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Results Section Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Define image mappings for each result
    const resultMappings = {
        result1: {
            0: 'assets/aesthetic_model3/image_0.png',
            8: 'assets/aesthetic_model3/image_1.png',
            17: 'assets/aesthetic_model3/image_2.png',
            25: 'assets/aesthetic_model3/image_3.png',
            33: 'assets/aesthetic_model3/image_4.png',
            42: 'assets/aesthetic_model3/image_5.png',
            50: 'assets/aesthetic_model3/image_6.png',
            58: 'assets/aesthetic_model3/image_7.png',
            67: 'assets/aesthetic_model3/image_8.png',
            75: 'assets/aesthetic_model3/image_9.png',
            83: 'assets/aesthetic_model3/image_10.png',
            92: 'assets/aesthetic_model3/image_11.png',
            100: 'assets/aesthetic_model3/image_11.png'
        },
        result2: {
            0: 'assets/horse_uncle/image_0.png',
            8: 'assets/horse_uncle/image_1.png',
            17: 'assets/horse_uncle/image_2.png',
            25: 'assets/horse_uncle/image_3.png',
            33: 'assets/horse_uncle/image_4.png',
            42: 'assets/horse_uncle/image_5.png',
            50: 'assets/horse_uncle/image_6.png',
            58: 'assets/horse_uncle/image_7.png',
            67: 'assets/horse_uncle/image_8.png',
            75: 'assets/horse_uncle/image_9.png',
            83: 'assets/horse_uncle/image_10.png',
            92: 'assets/horse_uncle/image_11.png',
            100: 'assets/horse_uncle/image_11.png'
        },
        result3: {
            0: 'assets/man_jacket/image_0.png',
            8: 'assets/man_jacket/image_1.png',
            17: 'assets/man_jacket/image_2.png',
            25: 'assets/man_jacket/image_3.png',
            33: 'assets/man_jacket/image_4.png',
            42: 'assets/man_jacket/image_5.png',
            50: 'assets/man_jacket/image_6.png',
            58: 'assets/man_jacket/image_7.png',
            67: 'assets/man_jacket/image_8.png',
            75: 'assets/man_jacket/image_9.png',
            83: 'assets/man_jacket/image_10.png',
            92: 'assets/man_jacket/image_11.png',
            100: 'assets/man_jacket/image_11.png'
        },
        result4: {
            0: 'assets/person_blur/image_0.png',
            8: 'assets/person_blur/image_1.png',
            17: 'assets/person_blur/image_2.png',
            25: 'assets/person_blur/image_3.png',
            33: 'assets/person_blur/image_4.png',
            42: 'assets/person_blur/image_5.png',
            50: 'assets/person_blur/image_6.png',
            58: 'assets/person_blur/image_7.png',
            67: 'assets/person_blur/image_8.png',
            75: 'assets/person_blur/image_9.png',
            83: 'assets/person_blur/image_10.png',
            92: 'assets/person_blur/image_11.png',
            100: 'assets/person_blur/image_11.png'
        },
        result5: {
            0: 'assets/glasses_img4/image_0.png',
            8: 'assets/glasses_img4/image_1.png',
            17: 'assets/glasses_img4/image_2.png',
            25: 'assets/glasses_img4/image_3.png',
            33: 'assets/glasses_img4/image_4.png',
            42: 'assets/glasses_img4/image_5.png',
            50: 'assets/glasses_img4/image_6.png',
            58: 'assets/glasses_img4/image_7.png',
            67: 'assets/glasses_img4/image_8.png',
            75: 'assets/glasses_img4/image_9.png',
            83: 'assets/glasses_img4/image_10.png',
            92: 'assets/glasses_img4/image_11.png',
            100: 'assets/glasses_img4/image_11.png'
        },
        result6: {
            0: 'assets/panda/image_0.png',
            8: 'assets/panda/image_1.png',
            17: 'assets/panda/image_2.png',
            25: 'assets/panda/image_3.png',
            33: 'assets/panda/image_4.png',
            42: 'assets/panda/image_5.png',
            50: 'assets/panda/image_6.png',
            58: 'assets/panda/image_7.png',
            67: 'assets/panda/image_8.png',
            75: 'assets/panda/image_9.png',
            83: 'assets/panda/image_10.png',
            92: 'assets/panda/image_11.png',
            100: 'assets/panda/image_11.png'
        }
    };
    
    // Setup each result slider
    setupResultSlider('result1', 'result1-slider', 'result1-image', resultMappings.result1);
    setupResultSlider('result2', 'result2-slider', 'result2-image', resultMappings.result2);
    setupResultSlider('result3', 'result3-slider', 'result3-image', resultMappings.result3);
    setupResultSlider('result4', 'result4-slider', 'result4-image', resultMappings.result4);
    setupResultSlider('result5', 'result5-slider', 'result5-image', resultMappings.result5);
    setupResultSlider('result6', 'result6-slider', 'result6-image', resultMappings.result6);
});

function setupResultSlider(type, sliderId, imageId, imageMapping) {
    const slider = document.getElementById(sliderId);
    const image = document.getElementById(imageId);
    
    if (slider && image) {
        slider.addEventListener('input', function() {
            const sliderValue = parseInt(this.value);
            
            // Find the closest available image
            const availableValues = Object.keys(imageMapping).map(Number).sort((a, b) => a - b);
            let closestValue = availableValues[0];
            
            for (let i = 0; i < availableValues.length; i++) {
                if (Math.abs(availableValues[i] - sliderValue) < Math.abs(closestValue - sliderValue)) {
                    closestValue = availableValues[i];
                }
            }
            
            const imageSrc = imageMapping[closestValue];
            
            if (imageSrc) {
                // Add subtle fade effect during image change
                image.style.opacity = '0.8';
                
                // Change image source
                image.src = imageSrc;
                
                // Handle image load to restore opacity
                image.onload = function() {
                    this.style.opacity = '1';
                };
                
                // Handle image error (fallback to first image)
                image.onerror = function() {
                    this.src = imageMapping[0];
                    this.style.opacity = '1';
                };
            }
        });
        
        // Initialize with default image
        image.src = imageMapping[0];
    }
}

// Interactive Examples Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Define image mappings for each example
    const exampleMappings = {
        'chair-apple': {
            0: 'assets/chair_apple_Transform_the_floor__1/image_0.png',
            8: 'assets/chair_apple_Transform_the_floor__1/image_1.png',
            17: 'assets/chair_apple_Transform_the_floor__1/image_2.png',
            25: 'assets/chair_apple_Transform_the_floor__1/image_3.png',
            33: 'assets/chair_apple_Transform_the_floor__1/image_4.png',
            42: 'assets/chair_apple_Transform_the_floor__1/image_5.png',
            50: 'assets/chair_apple_Transform_the_floor__1/image_6.png',
            58: 'assets/chair_apple_Transform_the_floor__1/image_7.png',
            67: 'assets/chair_apple_Transform_the_floor__1/image_8.png',
            75: 'assets/chair_apple_Transform_the_floor__1/image_9.png',
            83: 'assets/chair_apple_Transform_the_floor__1/image_10.png',
            92: 'assets/chair_apple_Transform_the_floor__1/image_11.png',
            100: 'assets/chair_apple_Transform_the_floor__1/image_11.png'
        },
        'enfield': {
            0: 'assets/enfield3_Transform_the_scene__0/image_0.png',
            8: 'assets/enfield3_Transform_the_scene__0/image_1.png',
            17: 'assets/enfield3_Transform_the_scene__0/image_2.png',
            25: 'assets/enfield3_Transform_the_scene__0/image_3.png',
            33: 'assets/enfield3_Transform_the_scene__0/image_4.png',
            42: 'assets/enfield3_Transform_the_scene__0/image_5.png',
            50: 'assets/enfield3_Transform_the_scene__0/image_6.png',
            58: 'assets/enfield3_Transform_the_scene__0/image_7.png',
            67: 'assets/enfield3_Transform_the_scene__0/image_8.png',
            75: 'assets/enfield3_Transform_the_scene__0/image_9.png',
            83: 'assets/enfield3_Transform_the_scene__0/image_10.png',
            92: 'assets/enfield3_Transform_the_scene__0/image_11.png',
            100: 'assets/enfield3_Transform_the_scene__0/image_11.png'
        },
        'model1-hair': {
            0: 'assets/model1_boot_Grow_her_hairs_to_be_0/image_0.png',
            8: 'assets/model1_boot_Grow_her_hairs_to_be_0/image_1.png',
            17: 'assets/model1_boot_Grow_her_hairs_to_be_0/image_2.png',
            25: 'assets/model1_boot_Grow_her_hairs_to_be_0/image_3.png',
            33: 'assets/model1_boot_Grow_her_hairs_to_be_0/image_4.png',
            42: 'assets/model1_boot_Grow_her_hairs_to_be_0/image_5.png',
            50: 'assets/model1_boot_Grow_her_hairs_to_be_0/image_6.png',
            58: 'assets/model1_boot_Grow_her_hairs_to_be_0/image_7.png',
            67: 'assets/model1_boot_Grow_her_hairs_to_be_0/image_8.png',
            75: 'assets/model1_boot_Grow_her_hairs_to_be_0/image_9.png',
            83: 'assets/model1_boot_Grow_her_hairs_to_be_0/image_10.png',
            92: 'assets/model1_boot_Grow_her_hairs_to_be_0/image_11.png',
            100: 'assets/model1_boot_Grow_her_hairs_to_be_0/image_11.png'
        },
        'model1-chubby': {
            0: 'assets/model1_boot_Make_her_chubby_and__1/image_0.png',
            8: 'assets/model1_boot_Make_her_chubby_and__1/image_1.png',
            17: 'assets/model1_boot_Make_her_chubby_and__1/image_2.png',
            25: 'assets/model1_boot_Make_her_chubby_and__1/image_3.png',
            33: 'assets/model1_boot_Make_her_chubby_and__1/image_4.png',
            42: 'assets/model1_boot_Make_her_chubby_and__1/image_5.png',
            50: 'assets/model1_boot_Make_her_chubby_and__1/image_6.png',
            58: 'assets/model1_boot_Make_her_chubby_and__1/image_7.png',
            67: 'assets/model1_boot_Make_her_chubby_and__1/image_8.png',
            75: 'assets/model1_boot_Make_her_chubby_and__1/image_9.png',
            83: 'assets/model1_boot_Make_her_chubby_and__1/image_10.png',
            92: 'assets/model1_boot_Make_her_chubby_and__1/image_11.png',
            100: 'assets/model1_boot_Make_her_chubby_and__1/image_11.png'
        },
        'model2-reimagine': {
            0: 'assets/model2_Reimagine_the_scene__1/image_0.png',
            8: 'assets/model2_Reimagine_the_scene__1/image_1.png',
            17: 'assets/model2_Reimagine_the_scene__1/image_2.png',
            25: 'assets/model2_Reimagine_the_scene__1/image_3.png',
            33: 'assets/model2_Reimagine_the_scene__1/image_4.png',
            42: 'assets/model2_Reimagine_the_scene__1/image_5.png',
            50: 'assets/model2_Reimagine_the_scene__1/image_6.png',
            58: 'assets/model2_Reimagine_the_scene__1/image_7.png',
            67: 'assets/model2_Reimagine_the_scene__1/image_8.png',
            75: 'assets/model2_Reimagine_the_scene__1/image_9.png',
            83: 'assets/model2_Reimagine_the_scene__1/image_10.png',
            92: 'assets/model2_Reimagine_the_scene__1/image_11.png',
            100: 'assets/model2_Reimagine_the_scene__1/image_11.png'
        },
        'lamp': {
            0: 'assets/no_lamp_Turn_on_the_hanging__2/image_0.png',
            8: 'assets/no_lamp_Turn_on_the_hanging__2/image_1.png',
            17: 'assets/no_lamp_Turn_on_the_hanging__2/image_2.png',
            25: 'assets/no_lamp_Turn_on_the_hanging__2/image_3.png',
            33: 'assets/no_lamp_Turn_on_the_hanging__2/image_4.png',
            42: 'assets/no_lamp_Turn_on_the_hanging__2/image_5.png',
            50: 'assets/no_lamp_Turn_on_the_hanging__2/image_6.png',
            58: 'assets/no_lamp_Turn_on_the_hanging__2/image_7.png',
            67: 'assets/no_lamp_Turn_on_the_hanging__2/image_8.png',
            75: 'assets/no_lamp_Turn_on_the_hanging__2/image_9.png',
            83: 'assets/no_lamp_Turn_on_the_hanging__2/image_10.png',
            92: 'assets/no_lamp_Turn_on_the_hanging__2/image_11.png',
            100: 'assets/no_lamp_Turn_on_the_hanging__2/image_11.png'
        },
        'red-panda': {
            0: 'assets/red_panda_Transform_the_panda__0/image_0.png',
            8: 'assets/red_panda_Transform_the_panda__0/image_1.png',
            17: 'assets/red_panda_Transform_the_panda__0/image_2.png',
            25: 'assets/red_panda_Transform_the_panda__0/image_3.png',
            33: 'assets/red_panda_Transform_the_panda__0/image_4.png',
            42: 'assets/red_panda_Transform_the_panda__0/image_5.png',
            50: 'assets/red_panda_Transform_the_panda__0/image_6.png',
            58: 'assets/red_panda_Transform_the_panda__0/image_7.png',
            67: 'assets/red_panda_Transform_the_panda__0/image_8.png',
            75: 'assets/red_panda_Transform_the_panda__0/image_9.png',
            83: 'assets/red_panda_Transform_the_panda__0/image_10.png',
            92: 'assets/red_panda_Transform_the_panda__0/image_11.png',
            100: 'assets/red_panda_Transform_the_panda__0/image_11.png'
        },
        'teaser-laugh': {
            0: 'assets/teaser_model2_Make_him_laugh_0/image_0.png',
            8: 'assets/teaser_model2_Make_him_laugh_0/image_1.png',
            17: 'assets/teaser_model2_Make_him_laugh_0/image_2.png',
            25: 'assets/teaser_model2_Make_him_laugh_0/image_3.png',
            33: 'assets/teaser_model2_Make_him_laugh_0/image_4.png',
            42: 'assets/teaser_model2_Make_him_laugh_0/image_5.png',
            50: 'assets/teaser_model2_Make_him_laugh_0/image_6.png',
            58: 'assets/teaser_model2_Make_him_laugh_0/image_7.png',
            67: 'assets/teaser_model2_Make_him_laugh_0/image_8.png',
            75: 'assets/teaser_model2_Make_him_laugh_0/image_9.png',
            83: 'assets/teaser_model2_Make_him_laugh_0/image_10.png',
            92: 'assets/teaser_model2_Make_him_laugh_0/image_11.png',
            100: 'assets/teaser_model2_Make_him_laugh_0/image_11.png'
        },
        'teaser-hair': {
            0: 'assets/teaser_model2_Tranform_his_hairs_i_1/image_0.png',
            8: 'assets/teaser_model2_Tranform_his_hairs_i_1/image_1.png',
            17: 'assets/teaser_model2_Tranform_his_hairs_i_1/image_2.png',
            25: 'assets/teaser_model2_Tranform_his_hairs_i_1/image_3.png',
            33: 'assets/teaser_model2_Tranform_his_hairs_i_1/image_4.png',
            42: 'assets/teaser_model2_Tranform_his_hairs_i_1/image_5.png',
            50: 'assets/teaser_model2_Tranform_his_hairs_i_1/image_6.png',
            58: 'assets/teaser_model2_Tranform_his_hairs_i_1/image_7.png',
            67: 'assets/teaser_model2_Tranform_his_hairs_i_1/image_8.png',
            75: 'assets/teaser_model2_Tranform_his_hairs_i_1/image_9.png',
            83: 'assets/teaser_model2_Tranform_his_hairs_i_1/image_10.png',
            92: 'assets/teaser_model2_Tranform_his_hairs_i_1/image_11.png',
            100: 'assets/teaser_model2_Tranform_his_hairs_i_1/image_11.png'
        },
        'woody': {
            0: 'assets/woody_Make_him_fat_and_chu_1/image_0.png',
            8: 'assets/woody_Make_him_fat_and_chu_1/image_1.png',
            17: 'assets/woody_Make_him_fat_and_chu_1/image_2.png',
            25: 'assets/woody_Make_him_fat_and_chu_1/image_3.png',
            33: 'assets/woody_Make_him_fat_and_chu_1/image_4.png',
            42: 'assets/woody_Make_him_fat_and_chu_1/image_5.png',
            50: 'assets/woody_Make_him_fat_and_chu_1/image_6.png',
            58: 'assets/woody_Make_him_fat_and_chu_1/image_7.png',
            67: 'assets/woody_Make_him_fat_and_chu_1/image_8.png',
            75: 'assets/woody_Make_him_fat_and_chu_1/image_9.png',
            83: 'assets/woody_Make_him_fat_and_chu_1/image_10.png',
            92: 'assets/woody_Make_him_fat_and_chu_1/image_11.png',
            100: 'assets/woody_Make_him_fat_and_chu_1/image_11.png'
        },
        'person-blur-chubby': {
            0: 'assets/person_blur_Make_her_chubby_and__0/image_0.png',
            8: 'assets/person_blur_Make_her_chubby_and__0/image_1.png',
            17: 'assets/person_blur_Make_her_chubby_and__0/image_2.png',
            25: 'assets/person_blur_Make_her_chubby_and__0/image_3.png',
            33: 'assets/person_blur_Make_her_chubby_and__0/image_4.png',
            42: 'assets/person_blur_Make_her_chubby_and__0/image_5.png',
            50: 'assets/person_blur_Make_her_chubby_and__0/image_6.png',
            58: 'assets/person_blur_Make_her_chubby_and__0/image_7.png',
            67: 'assets/person_blur_Make_her_chubby_and__0/image_8.png',
            75: 'assets/person_blur_Make_her_chubby_and__0/image_9.png',
            83: 'assets/person_blur_Make_her_chubby_and__0/image_10.png',
            92: 'assets/person_blur_Make_her_chubby_and__0/image_11.png',
            100: 'assets/person_blur_Make_her_chubby_and__0/image_11.png'
        },
        'glasses-alt': {
            0: 'assets/glasses_img4_0/image_0.png',
            8: 'assets/glasses_img4_0/image_1.png',
            17: 'assets/glasses_img4_0/image_2.png',
            25: 'assets/glasses_img4_0/image_3.png',
            33: 'assets/glasses_img4_0/image_4.png',
            42: 'assets/glasses_img4_0/image_5.png',
            50: 'assets/glasses_img4_0/image_6.png',
            58: 'assets/glasses_img4_0/image_7.png',
            67: 'assets/glasses_img4_0/image_8.png',
            75: 'assets/glasses_img4_0/image_9.png',
            83: 'assets/glasses_img4_0/image_10.png',
            92: 'assets/glasses_img4_0/image_11.png',
            100: 'assets/glasses_img4_0/image_11.png'
        }
    };
    
    // Setup each example slider
    setupExampleSlider('chair-apple', 'chair-apple-slider', 'chair-apple-image', exampleMappings['chair-apple']);
    setupExampleSlider('enfield', 'enfield-slider', 'enfield-image', exampleMappings['enfield']);
    setupExampleSlider('model1-hair', 'model1-hair-slider', 'model1-hair-image', exampleMappings['model1-hair']);
    setupExampleSlider('model1-chubby', 'model1-chubby-slider', 'model1-chubby-image', exampleMappings['model1-chubby']);
    setupExampleSlider('model2-reimagine', 'model2-reimagine-slider', 'model2-reimagine-image', exampleMappings['model2-reimagine']);
    setupExampleSlider('lamp', 'lamp-slider', 'lamp-image', exampleMappings['lamp']);
    setupExampleSlider('red-panda', 'red-panda-slider', 'red-panda-image', exampleMappings['red-panda']);
    setupExampleSlider('teaser-laugh', 'teaser-laugh-slider', 'teaser-laugh-image', exampleMappings['teaser-laugh']);
    setupExampleSlider('teaser-hair', 'teaser-hair-slider', 'teaser-hair-image', exampleMappings['teaser-hair']);
    setupExampleSlider('woody', 'woody-slider', 'woody-image', exampleMappings['woody']);
    setupExampleSlider('person-blur-chubby', 'person-blur-chubby-slider', 'person-blur-chubby-image', exampleMappings['person-blur-chubby']);
    setupExampleSlider('glasses-alt', 'glasses-alt-slider', 'glasses-alt-image', exampleMappings['glasses-alt']);
});

function setupExampleSlider(type, sliderId, imageId, imageMapping) {
    const slider = document.getElementById(sliderId);
    const image = document.getElementById(imageId);
    
    if (slider && image) {
        slider.addEventListener('input', function() {
            const sliderValue = parseInt(this.value);
            
            // Find the closest available image
            const availableValues = Object.keys(imageMapping).map(Number).sort((a, b) => a - b);
            let closestValue = availableValues[0];
            
            for (let i = 0; i < availableValues.length; i++) {
                if (Math.abs(availableValues[i] - sliderValue) < Math.abs(closestValue - sliderValue)) {
                    closestValue = availableValues[i];
                }
            }
            
            const imageSrc = imageMapping[closestValue];
            
            if (imageSrc) {
                // Add subtle fade effect during image change
                image.style.opacity = '0.8';
                
                // Change image source
                image.src = imageSrc;
                
                // Handle image load to restore opacity
                image.onload = function() {
                    this.style.opacity = '1';
                };
                
                // Handle image error (fallback to first image)
                image.onerror = function() {
                    this.src = imageMapping[0];
                    this.style.opacity = '1';
                };
            }
        });
        
        // Initialize with default image
        image.src = imageMapping[0];
    }
}
