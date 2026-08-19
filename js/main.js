/**
 * Rupson Oil Nigeria Limited - Main JavaScript
 * Features: Scroll Reveal, Mobile Nav, Form Validation, Video Player, Smooth Scroll
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // =========================================================================
    // 1. Scroll Reveal Animation System
    // =========================================================================
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    
    if (revealElements.length > 0) {
        const revealOptions = {
            threshold: 0.15,
            rootMargin: '-40px 0px -40px 0px'
        };

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, revealOptions);

        revealElements.forEach(el => revealObserver.observe(el));
    }

    // =========================================================================
    // 2. Header Scroll Effects & Active Nav Highlighting
    // =========================================================================
    const siteHeader = document.getElementById('site-header');
    
    if (siteHeader) {
        const handleScroll = () => {
            if (window.scrollY > 60) {
                siteHeader.classList.add('is-scrolled');
            } else {
                siteHeader.classList.remove('is-scrolled');
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Init
    }

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    if (sections.length > 0 && navLinks.length > 0) {
        const navObserverOptions = {
            rootMargin: '-25% 0px -65% 0px'
        };

        const navObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const currentId = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${currentId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, navObserverOptions);

        sections.forEach(section => navObserver.observe(section));
    }

    // =========================================================================
    // 3. Mobile Navigation
    // =========================================================================
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    const mobileNavPanel = document.getElementById('mobile-nav-panel');

    if (mobileNavToggle && mobileNavPanel) {
        const toggleMenu = () => {
            const isExpanded = mobileNavToggle.getAttribute('aria-expanded') === 'true';
            mobileNavToggle.setAttribute('aria-expanded', !isExpanded);
            mobileNavPanel.classList.toggle('is-open');
            mobileNavToggle.classList.toggle('is-active'); // For hamburger animation
            
            if (!isExpanded) {
                document.body.style.overflow = 'hidden'; // Lock scroll
            } else {
                document.body.style.overflow = ''; // Unlock scroll
            }
        };

        const closeMenu = () => {
            mobileNavToggle.setAttribute('aria-expanded', 'false');
            mobileNavPanel.classList.remove('is-open');
            mobileNavToggle.classList.remove('is-active');
            document.body.style.overflow = '';
        };

        mobileNavToggle.addEventListener('click', toggleMenu);

        // Close on link click
        const mobileLinks = mobileNavPanel.querySelectorAll('a');
        mobileLinks.forEach(link => link.addEventListener('click', closeMenu));

        // Close on click outside
        document.addEventListener('click', (e) => {
            if (mobileNavPanel.classList.contains('is-open') && 
                !mobileNavPanel.contains(e.target) && 
                !mobileNavToggle.contains(e.target)) {
                closeMenu();
            }
        });
    }

    // =========================================================================
    // 4. Video Player with Skeleton Loader & Tab Switching
    // =========================================================================
    const allVideos = document.querySelectorAll('.video-wrapper video');
    
    allVideos.forEach(video => {
        const wrapper = video.closest('.video-wrapper');
        const skeleton = wrapper ? wrapper.querySelector('.video-skeleton') : null;
        
        const hideSkeleton = () => {
            if (skeleton) {
                skeleton.classList.add('is-hidden');
            }
        };

        // Attach events to clear skeleton immediately
        ['loadedmetadata', 'loadeddata', 'canplay', 'play', 'playing', 'pause', 'click'].forEach(evt => {
            video.addEventListener(evt, hideSkeleton);
        });

        // Safety fallback timer so video is never obscured
        setTimeout(hideSkeleton, 600);
    });

    // =========================================================================
    // 4. Video Card Stacking Carousel Gallery
    // =========================================================================
    const card1 = document.getElementById('video-card-1');
    const card2 = document.getElementById('video-card-2');
    const video1 = document.getElementById('facility-video-1');
    const video2 = document.getElementById('facility-video-2');
    const arrowLeft = document.querySelector('.gallery-arrow-left');
    const arrowRight = document.querySelector('.gallery-arrow-right');
    
    let activeCardNum = 1;

    const swapGalleryCards = (direction) => {
        if (!card1 || !card2) return;

        if (activeCardNum === 1) {
            card1.classList.remove('front');
            card1.classList.add('back');
            card2.classList.remove('back');
            card2.classList.add('front');
            
            // Pause video 1 if it was playing, keeping its timestamp intact
            if (video1 && !video1.paused) {
                video1.pause();
            }
            activeCardNum = 2;
        } else {
            card2.classList.remove('front');
            card2.classList.add('back');
            card1.classList.remove('back');
            card1.classList.add('front');
            
            // Pause video 2 if it was playing, keeping its timestamp intact
            if (video2 && !video2.paused) {
                video2.pause();
            }
            activeCardNum = 1;
        }
    };

    if (arrowLeft && arrowRight) {
        arrowLeft.addEventListener('click', () => swapGalleryCards('left'));
        arrowRight.addEventListener('click', () => swapGalleryCards('right'));
    }


    // =========================================================================
    // 5. Product Inquiry Pre-selection
    // =========================================================================
    const productInquiryBtns = document.querySelectorAll('[data-product-inquire]');
    const quoteProductSelect = document.getElementById('quote-product');
    const rfqForm = document.getElementById('rfq-form');
    
    if (productInquiryBtns.length > 0 && quoteProductSelect) {
        productInquiryBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const productValue = btn.dataset.productInquire;
                
                // Set the select value
                const options = Array.from(quoteProductSelect.options);
                const optionMatch = options.find(opt => opt.value === productValue || opt.text.toLowerCase() === productValue.toLowerCase());
                if (optionMatch) {
                    quoteProductSelect.value = optionMatch.value;
                }
                
                // Smooth scroll to contact
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    const headerOffset = 80;
                    const elementPosition = contactSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.scrollY - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                    // Highlight form and focus first empty
                    if (rfqForm) {
                        rfqForm.classList.add('highlight');
                        setTimeout(() => rfqForm.classList.remove('highlight'), 2000);
                        
                        setTimeout(() => {
                            const inputs = rfqForm.querySelectorAll('input, select, textarea');
                            for (let input of inputs) {
                                if (!input.value.trim() && input.type !== 'hidden') {
                                    input.focus();
                                    break;
                                }
                            }
                        }, 500); // Wait for scroll
                    }
                }
            });
        });
    }

    // =========================================================================
    // 6. CTA Button Pressed States
    // =========================================================================
    const ctaButtons = document.querySelectorAll('a[href="#contact"].btn');
    
    if (ctaButtons.length > 0) {
        ctaButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                
                btn.classList.add('btn-pressed');
                
                setTimeout(() => {
                    btn.classList.remove('btn-pressed');
                    
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                        const headerOffset = 80;
                        const elementPosition = contactSection.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.scrollY - headerOffset;
                        
                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                        
                        const quoteNameInput = document.getElementById('quote-name');
                        if (quoteNameInput) {
                            setTimeout(() => quoteNameInput.focus(), 500);
                        }
                    }
                }, 180);
            });
        });
    }

    // =========================================================================
    // 7. Quote Form Validation & Submission
    // =========================================================================
    if (rfqForm) {
        const formAlert = document.getElementById('form-status-alert');
        const submitBtn = document.getElementById('quote-submit-btn');

        const validators = {
            name: (val) => val.trim().length >= 2,
            company: (val) => val.trim().length >= 2,
            email: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim()),
            phone: (val) => /^[\d\s\+\-\(\)]{8,20}$/.test(val.trim()),
            product: (val) => val.trim() !== '',
            message: (val) => val.trim().length >= 5
        };

        const validateField = (input) => {
            const fieldName = input.name || (input.id || '').replace('quote-', '');
            const validator = validators[fieldName];
            
            if (validator) {
                const isValid = validator(input.value);
                const formGroup = input.closest('.form-group');
                
                if (formGroup) {
                    if (isValid) {
                        formGroup.classList.remove('has-error');
                        input.classList.remove('is-invalid');
                    } else {
                        formGroup.classList.add('has-error');
                        input.classList.add('is-invalid');
                    }
                }
                return isValid;
            }
            return true; // Ignore if no validator
        };

        // Input and Blur event listeners
        const formInputs = rfqForm.querySelectorAll('input, select, textarea');
        formInputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            
            input.addEventListener('input', () => {
                const formGroup = input.closest('.form-group');
                if (formGroup && formGroup.classList.contains('has-error')) {
                    validateField(input);
                }
            });
        });

        rfqForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            let isFormValid = true;
            let firstInvalidInput = null;

            formInputs.forEach(input => {
                const isValid = validateField(input);
                if (!isValid) {
                    isFormValid = false;
                    if (!firstInvalidInput) {
                        firstInvalidInput = input;
                    }
                }
            });

            if (!isFormValid) {
                if (firstInvalidInput) {
                    firstInvalidInput.focus();
                }
                return;
            }

            // Real form submission via FormSubmit.co API
            if (submitBtn) {
                submitBtn.classList.add('is-loading');
                submitBtn.disabled = true;
            }

            // Collect form data values
            const formData = {};
            formInputs.forEach(input => {
                const name = input.name || input.id.replace('quote-', '');
                formData[name] = input.value;
            });
            
            // Add custom email subject
            formData['_subject'] = `New Rupson Oil Inquiry from ${formData['company'] || 'Website'}`;
            
            fetch('https://formsubmit.co/ajax/rupsonoilnl@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (submitBtn) {
                    submitBtn.classList.remove('is-loading');
                    submitBtn.disabled = false;
                }
                
                const companyName = formData['company'] || 'Valued Customer';
                const refId = 'RFQ-' + Math.floor(100000 + Math.random() * 900000);
                
                if (formAlert) {
                    formAlert.innerHTML = `<strong>Success!</strong> Thank you, ${companyName}. Your inquiry has been sent successfully to our sales inbox. Reference ID: <strong>${refId}</strong>.`;
                    formAlert.className = 'alert alert-success';
                    formAlert.style.display = 'block';
                    formAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                
                rfqForm.reset();
                formInputs.forEach(input => {
                    const formGroup = input.closest('.form-group');
                    if (formGroup) formGroup.classList.remove('has-error');
                    input.classList.remove('is-invalid');
                });
            })
            .catch(error => {
                console.error('Error submitting form:', error);
                if (submitBtn) {
                    submitBtn.classList.remove('is-loading');
                    submitBtn.disabled = false;
                }
                if (formAlert) {
                    formAlert.innerHTML = `<strong>Submission Error!</strong> Something went wrong. Please try again or chat with our team on WhatsApp directly.`;
                    formAlert.className = 'alert alert-error';
                    formAlert.style.display = 'block';
                    formAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            });
        });
    }

    // =========================================================================
    // 8. Smooth Section Scroll for All Internal Links
    // =========================================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Ignore links that we've already attached specific behaviors to, like CTA buttons
            if (this.classList.contains('btn') && this.getAttribute('href') === '#contact') return;
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // =========================================================================
    // 9. Counter Animation for Stats
    // =========================================================================
    const statCounters = document.querySelectorAll('.stat-number');
    
    if (statCounters.length > 0) {
        const animateCounter = (el) => {
            const targetStr = el.getAttribute('data-target') || el.textContent.replace(/\D/g, '');
            const target = parseInt(targetStr, 10);
            if (!target) return;
            
            const duration = 2000; // ms
            let startTimestamp = null;
            
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                
                // Ease out quad
                const easeOutQuad = progress * (2 - progress);
                
                el.textContent = Math.floor(easeOutQuad * target);
                
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                } else {
                    el.textContent = target; // Ensure exact final value
                }
            };
            
            window.requestAnimationFrame(step);
        };

        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statCounters.forEach(counter => {
            counter.textContent = '0'; // reset early
            counterObserver.observe(counter);
        });
    }

    // =========================================================================
    // 10. Sequential Typewriter for Hero Title
    // =========================================================================
    const typeWriterHero = () => {
        const part1 = document.getElementById('hero-type-1');
        const part2 = document.getElementById('hero-type-2');
        
        if (!part1 || !part2) return;
        
        const txt1 = 'Rupson Oil';
        const txt2 = 'Nigeria Limited';
        
        let i = 0;
        let j = 0;
        const speed = 75; // speed in ms per character
        
        part1.textContent = '';
        part2.textContent = '';
        
        setTimeout(() => {
            // Type part 1
            const timer1 = setInterval(() => {
                if (i < txt1.length) {
                    part1.textContent += txt1.charAt(i);
                    i++;
                } else {
                    clearInterval(timer1);
                    
                    // Immediately start typing part 2
                    const timer2 = setInterval(() => {
                        if (j < txt2.length) {
                            part2.textContent += txt2.charAt(j);
                            j++;
                        } else {
                            clearInterval(timer2);
                        }
                    }, speed);
                }
            }, speed);
        }, 300); // Small initial delay on load
    };

    typeWriterHero();

    // =========================================================================
    // 11. Hero Image 3D Crossfade Slideshow
    // =========================================================================
    const heroSlides = document.querySelectorAll('.hero-3d-scene .slide-img');
    if (heroSlides.length > 0) {
        let currentSlide = 0;
        setInterval(() => {
            heroSlides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % heroSlides.length;
            heroSlides[currentSlide].classList.add('active');
        }, 4000);
    }

});
