document.addEventListener('DOMContentLoaded', function() {
    const dropArea = document.getElementById('drop-area');
    const fileInput = document.getElementById('fileInput');
    const previewSection = document.getElementById('preview-section');
    const previewImage = document.getElementById('preview-image');
    const loading = document.getElementById('loading');
    const results = document.getElementById('results');
    const breedSection = document.getElementById('breed-section');
    const analyzeStructureBtn = document.getElementById('analyze-structure-btn');
    const structureResults = document.getElementById('structure-results');

    // Check if all required elements exist
    if (!dropArea || !fileInput || !previewSection || !previewImage || !loading || !results) {
        console.error('Required elements not found in DOM');
        console.log('dropArea:', dropArea);
        console.log('fileInput:', fileInput);
        console.log('previewSection:', previewSection);
        console.log('previewImage:', previewImage);
        console.log('loading:', loading);
        console.log('results:', results);
        return;
    }

    console.log('All basic elements found');
    console.log('analyzeStructureBtn:', analyzeStructureBtn);
    console.log('structureResults:', structureResults);

    // Tab functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            const targetTab = document.getElementById(tabName + '-tab');
            if (targetTab) {
                targetTab.classList.add('active');
            }
        });
    });

    let currentImageFile = null;

    // Prevent default drag behaviors
    if (dropArea) {
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, preventDefaults, false);
            document.body.addEventListener(eventName, preventDefaults, false);
        });

        // Highlight drop zone when item is dragged over it
        ['dragenter', 'dragover'].forEach(eventName => {
            dropArea.addEventListener(eventName, highlight, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, unhighlight, false);
        });

        // Handle dropped files
        dropArea.addEventListener('drop', handleDrop, false);
        
        // Handle click to upload
        dropArea.addEventListener('click', () => {
            if (fileInput) {
                fileInput.click();
            }
        });
    }

    // Handle file input change
    if (fileInput) {
        fileInput.addEventListener('change', function() {
            handleFiles(this.files);
        });
    }

    function preventDefaults (e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function highlight(e) {
        if (dropArea) {
            dropArea.classList.add('highlight');
        }
    }

    function unhighlight(e) {
        if (dropArea) {
            dropArea.classList.remove('highlight');
        }
    }

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles(files);
    }

    function handleFiles(files) {
        if (files.length > 0) {
            const file = files[0];
            if (file.type.startsWith('image/')) {
                currentImageFile = file;
                uploadFile(file);
                displayPreview(file);
            } else {
                alert('Please upload an image file');
            }
        }
    }

    function displayPreview(file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            if (previewImage) {
                previewImage.src = e.target.result;
            }
            if (previewSection) {
                previewSection.classList.remove('d-none');
            }
            if (loading) {
                loading.classList.remove('d-none');
            }
            if (results) {
                results.classList.add('d-none');
            }
            if (structureResults) {
                structureResults.classList.add('d-none');
            }
            // Show the analyze button immediately when image is uploaded
            if (analyzeStructureBtn) {
                analyzeStructureBtn.classList.remove('d-none');
                console.log('Analyze Structure button shown after image upload');
            }
        }
        reader.readAsDataURL(file);
    }

    function uploadFile(file) {
        const formData = new FormData();
        formData.append('file', file);

        loading.classList.remove('d-none');
        results.classList.add('d-none');

        fetch('/predict', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                throw new Error(data.error);
            }
            displayResults(data);
        })
        .catch(error => {
            alert('Error: ' + error.message);
        })
        .finally(() => {
            loading.classList.add('d-none');
        });
    }

    function displayResults(data) {
        // Update cattle type and confidence
        const cattleTypeEl = document.getElementById('cattle-type');
        const cattleConfidenceEl = document.getElementById('cattle-confidence');
        
        if (cattleTypeEl) {
            cattleTypeEl.textContent = data.cattle_type;
        }
        
        if (cattleConfidenceEl) {
            cattleConfidenceEl.style.width = data.cattle_confidence;
            cattleConfidenceEl.textContent = data.cattle_confidence;
        }

        // Update breed information if available
        if (data.breed_result) {
            const breedNameEl = document.getElementById('breed-name');
            const breedConfidenceEl = document.getElementById('breed-confidence');
            
            if (breedNameEl) {
                breedNameEl.textContent = data.breed_result.name;
            }
            if (breedConfidenceEl) {
                breedConfidenceEl.style.width = data.breed_result.confidence;
                breedConfidenceEl.textContent = data.breed_result.confidence;
            }
            if (breedSection) {
                breedSection.classList.remove('d-none');
            }
        } else {
            if (breedSection) {
                breedSection.classList.add('d-none');
            }
        }

        // Show results section
        if (results) {
            results.classList.remove('d-none');
            results.classList.add('fade-in');
        }
        if (analyzeStructureBtn) {
            analyzeStructureBtn.classList.remove('d-none');
            console.log('Analyze Structure button should now be visible');
        } else {
            console.error('Analyze Structure button not found in DOM');
        }
    }

    // Body structure analysis
    if (analyzeStructureBtn) {
        analyzeStructureBtn.addEventListener('click', function() {
            if (!currentImageFile) {
                alert('Please upload an image first');
                return;
            }

            if (loading) {
                loading.classList.remove('d-none');
            }
            if (structureResults) {
                structureResults.classList.add('d-none');
            }

            const formData = new FormData();
            formData.append('file', currentImageFile);

            fetch('/analyze_structure', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (loading) {
                    loading.classList.add('d-none');
                }
                if (data.success) {
                    displayStructureResults(data);
                } else {
                    alert('Error: ' + data.error);
                }
            })
            .catch(error => {
                if (loading) {
                    loading.classList.add('d-none');
                }
                alert('Error: ' + error.message);
            });
        });
    }

    function displayStructureResults(data) {
        // Display visualization
        const structureImage = document.getElementById('structure-image');
        if (structureImage && data.visualization) {
            structureImage.src = 'data:image/jpeg;base64,' + data.visualization;
        }

        // Display measurements
        const measurementsList = document.getElementById('measurements-list');
        if (measurementsList) {
            measurementsList.innerHTML = '';

            if (data.measurements) {
                Object.entries(data.measurements).forEach(([key, value]) => {
                    if (typeof value === 'number') {
                        const measurementDiv = document.createElement('div');
                        measurementDiv.className = 'measurement-item';
                        
                        const title = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                        let unit = 'm';
                        let displayValue = value.toFixed(2);
                        
                        if (key.includes('angle')) {
                            unit = '°';
                            displayValue = value.toFixed(1);
                        } else if (key.includes('score')) {
                            unit = '/5.0';
                            displayValue = value.toFixed(1);
                        }
                        
                        measurementDiv.innerHTML = `
                            <h5>${title}</h5>
                            <div class="value">${displayValue} <span class="unit">${unit}</span></div>
                        `;
                        measurementsList.appendChild(measurementDiv);
                    }
                });
            }
        }

        // Display ATC Score
        const atcContainer = document.getElementById('atc-score-container');
        if (atcContainer && data.atc_score) {
            displayATCScore(data.atc_score);
        }

        // Display report
        const reportContent = document.getElementById('analysis-report');
        if (reportContent) {
            reportContent.textContent = data.report || 'No report available';
        }

        if (structureResults) {
            structureResults.classList.remove('d-none');
        }

        // Switch to structure tab
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        const structureTab = document.querySelector('[data-tab="structure"]');
        const structureTabContent = document.getElementById('structure-tab');
        
        if (structureTab) {
            structureTab.classList.add('active');
        }
        if (structureTabContent) {
            structureTabContent.classList.add('active');
        }
    }

    function displayATCScore(atcData) {
        const atcContainer = document.getElementById('atc-score-container');
        if (!atcContainer) return;

        // Get confidence level class
        const confidenceClass = atcData.confidence_level.toLowerCase();
        
        // Create ATC score HTML
        atcContainer.innerHTML = `
            <div class="atc-main-score ${confidenceClass}">
                <div class="atc-score-value">${atcData.atc_score}</div>
                <div class="atc-confidence-level">${atcData.confidence_level}</div>
                <div class="atc-description">
                    Animal Type Classification score based on morphometric analysis
                </div>
            </div>
            <div class="atc-components">
                <h5>Component Analysis</h5>
                ${Object.entries(atcData.components).map(([component, score]) => {
                    const componentClass = getComponentClass(score);
                    const componentName = component.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                    return `
                        <div class="component-item">
                            <span class="component-name">${componentName}</span>
                            <span class="component-score">${score}%</span>
                            <div class="component-bar">
                                <div class="component-progress ${componentClass}" style="width: ${score}%"></div>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;

        // Add recommendations if available
        if (atcData.recommendations && atcData.recommendations.length > 0) {
            const recommendationsHTML = `
                <div class="atc-recommendations">
                    <h5><i class="fas fa-lightbulb"></i> Recommendations</h5>
                    ${atcData.recommendations.map(rec => `
                        <div class="recommendation-item">${rec}</div>
                    `).join('')}
                </div>
            `;
            atcContainer.insertAdjacentHTML('beforeend', recommendationsHTML);
        }
    }

    function getComponentClass(score) {
        if (score >= 85) return 'excellent';
        if (score >= 70) return 'good';
        if (score >= 55) return 'fair';
        return 'poor';
    }
});