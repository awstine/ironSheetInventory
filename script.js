
        // --- COMMITMENT SLIDER LOGIC ---
        let comIndex = 1;
        
        // Auto-play every 5 seconds
        setInterval(() => { setCommitmentSlide(comIndex + 1); }, 5000); 
        
        function setCommitmentSlide(n) {
            showCommitment(comIndex = n);
        }

        function showCommitment(n) {
            let i;
            let cSlides = document.getElementsByClassName("full-slide");
            let cDots = document.getElementsByClassName("c-dot");
            
            if (n > cSlides.length) { comIndex = 1 }    
            if (n < 1) { comIndex = cSlides.length }
            
            // Hide all slides
            for (i = 0; i < cSlides.length; i++) {
                cSlides[i].classList.remove("active");
                cSlides[i].style.display = "none";
            }
            // Remove active dot
            for (i = 0; i < cDots.length; i++) {
                cDots[i].classList.remove("active");
            }
            
            // Show current slide
            // IMPORTANT: We use 'grid' here to maintain the layout, not 'block'
            cSlides[comIndex-1].style.display = "grid"; 
            
            // Small timeout to allow the CSS animation to trigger nicely
            setTimeout(() => cSlides[comIndex-1].classList.add("active"), 10);
            cDots[comIndex-1].classList.add("active");
        }

        // --- TESTIMONIALS SLIDER LOGIC ---
        let slideIndex = 1;
        
        // Auto-play (Optional - remove if not wanted)
        setInterval(() => {
            currentSlide(slideIndex + 1);
        }, 5000);

        function currentSlide(n) {
            showSlides(slideIndex = n);
        }

        function showSlides(n) {
            let i;
            let slides = document.getElementsByClassName("testimonial-slide");
            let dots = document.getElementsByClassName("dot");
            
            if (n > slides.length) { slideIndex = 1 }    
            if (n < 1) { slideIndex = slides.length }
            
            for (i = 0; i < slides.length; i++) {
                slides[i].classList.remove("active");
                slides[i].style.display = "none"; // Ensure hidden
            }
            for (i = 0; i < dots.length; i++) {
                dots[i].classList.remove("active");
            }
            
            slides[slideIndex-1].style.display = "block";
            setTimeout(() => slides[slideIndex-1].classList.add("active"), 10); // Small delay for animation
            dots[slideIndex-1].classList.add("active");
        }