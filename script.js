// Dark Mode Toggle
const themeToggle = document.getElementById("theme-toggle")
const themeIcon = document.getElementById("theme-icon")
const html = document.documentElement

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem("theme") || "light"
html.setAttribute("data-theme", currentTheme)
updateThemeIcon(currentTheme)

themeToggle.addEventListener("click", () => {
    const currentTheme = html.getAttribute("data-theme")
    const newTheme = currentTheme === "dark" ? "light" : "dark"

    html.setAttribute("data-theme", newTheme)
    localStorage.setItem("theme", newTheme)
    updateThemeIcon(newTheme)
})

function updateThemeIcon(theme) {
    if (theme === "dark") {
        themeIcon.className = "fas fa-sun"
    } else {
        themeIcon.className = "fas fa-moon"
    }
}

// Hero Slideshow
const heroSlides = document.querySelectorAll(".hero-slide")
const indicators = document.querySelectorAll(".indicator")
let currentSlide = 0

function showSlide(index) {
    // Remove active class from all slides and indicators
    heroSlides.forEach((slide) => slide.classList.remove("active"))
    indicators.forEach((indicator) => indicator.classList.remove("active"))

    // Add active class to current slide and indicator
    heroSlides[index].classList.add("active")
    indicators[index].classList.add("active")
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % heroSlides.length
    showSlide(currentSlide)
}

// Auto-advance slides every 5 seconds
setInterval(nextSlide, 5000)

// Manual slide control
indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
        currentSlide = index
        showSlide(currentSlide)
    })
})

// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active")
    navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-menu a").forEach((n) =>
    n.addEventListener("click", () => {
        hamburger.classList.remove("active")
        navMenu.classList.remove("active")
    }),
)

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault()
        const target = document.querySelector(this.getAttribute("href"))
        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start",
            })
        }
    })
})

// Header background on scroll
window.addEventListener("scroll", () => {
    const header = document.querySelector(".header")
    if (window.scrollY > 100) {
        header.style.background = "rgba(255, 255, 255, 0.98)"
        header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)"
    } else {
        header.style.background = "rgba(255, 255, 255, 0.95)"
        header.style.boxShadow = "none"
    }
})

// Chatbot functionality
const chatbotToggle = document.getElementById("chatbot-toggle")
const chatbotContainer = document.getElementById("chatbot")
const chatbotClose = document.getElementById("chatbot-close")
const chatbotInput = document.getElementById("chatbot-input")
const chatbotSend = document.getElementById("chatbot-send")
const chatbotMessages = document.getElementById("chatbot-messages")

// Chatbot responses
const enhancedBotResponses = {
    hello:
        "Hello! Welcome to DigiNova. I'm here to help you discover how our innovative digital solutions can transform your business. What would you like to know?",
    hi: "Hi there! Great to meet you! I'm your DigiNova assistant. Whether you're interested in our services, want to know about our team, or need pricing information, I'm here to help.",
    services:
        "We offer four main services:\n\n🔧 Software Development - Custom web and desktop applications\n📱 Mobile Applications - iOS and Android apps\n⚙️ Process Automation - Streamline your workflows\n🧠 AI Solutions - Machine learning and data analytics\n\nWhich service interests you most?",
    software:
        "Our software development expertise includes:\n\n• Modern web applications (React, Vue, Angular)\n• Backend systems (Node.js, Python, Java)\n• Database design and optimization\n• Cloud deployment and DevOps\n• API development and integration\n\nWould you like to discuss a specific project?",
    mobile:
        "Our mobile development services:\n\n📱 Native iOS & Android apps\n🔄 Cross-platform solutions (React Native, Flutter)\n🎨 UI/UX design and prototyping\n🔧 App maintenance and updates\n📊 Analytics and performance monitoring\n\nWhat type of mobile app are you considering?",
    ai: "Our AI solutions include:\n\n🤖 Machine Learning models\n💬 Natural Language Processing\n👁️ Computer Vision\n📈 Predictive Analytics\n🔍 Data Mining and Insights\n\nWhat business challenge would you like AI to solve?",
    automation:
        "We help automate:\n\n📋 Business processes and workflows\n📧 Email marketing and communications\n📊 Data entry and reporting\n🔄 System integrations\n⏰ Scheduling and task management\n\nWhat processes are taking up too much of your time?",
    contact:
        'Ready to get started? Here\'s how to reach us:\n\n📧 Email: info@diginova.com\n📞 Phone: +234 123 456 7890\n📍 Location: Lagos, Nigeria\n\nOr click "Book a Free Consultation" for a personalized discussion!',
    price:
        "Our pricing is tailored to each project's scope and complexity. We offer:\n\n💰 Competitive rates\n📋 Detailed project estimates\n⏱️ Flexible payment terms\n🎯 Value-focused solutions\n\nI'd recommend booking a free consultation to discuss your specific needs and get an accurate quote.",
    consultation:
        'Excellent choice! Our free consultation includes:\n\n✅ Project scope analysis\n✅ Technology recommendations\n✅ Timeline and budget estimate\n✅ Team introduction\n\nClick "Book a Free Consultation" or contact us directly. We typically respond within 2 hours!',
    team: "Our diverse team includes:\n\n👨‍💻 Senior developers with 5+ years experience\n🎨 UI/UX designers\n🤖 AI/ML specialists\n☁️ Cloud architects\n📊 Data scientists\n\nWe're passionate about creating innovative solutions that drive real business results across Africa.",
    about:
        "DigiNova is Africa's premier digital solutions company. We've completed 100+ projects, served 50+ happy clients, and have 5+ years of experience transforming businesses through technology.\n\nOur mission: Empower businesses through innovative digital solutions.\nOur vision: Become Africa's leading force in inclusive digital transformation.",
    default:
        "I'm here to help! You can ask me about:\n\n🔧 Our services and expertise\n💰 Pricing and project estimates\n👥 Our team and experience\n📞 How to get started\n📋 Booking a consultation\n\nWhat would you like to know?",
}

// Toggle chatbot
chatbotToggle.addEventListener("click", () => {
    chatbotContainer.classList.add("active")
    chatbotToggle.style.display = "none"
})

chatbotClose.addEventListener("click", () => {
    chatbotContainer.classList.remove("active")
    chatbotToggle.style.display = "block"
})

// Send message function
function sendMessage() {
    const message = chatbotInput.value.trim()
    if (message === "") return

    // Add user message
    addMessage(message, "user")
    chatbotInput.value = ""

    // Generate bot response
    setTimeout(() => {
        const response = getBotResponse(message)
        addMessage(response, "bot")
    }, 1000)
}

// Add message to chat
function addMessage(message, sender) {
    const messageDiv = document.createElement("div")
    messageDiv.classList.add("message", `${sender}-message`)
    messageDiv.innerHTML = `<p>${message}</p>`
    chatbotMessages.appendChild(messageDiv)
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight
}

// Get bot response
function getBotResponse(message) {
    const lowerMessage = message.toLowerCase()

    for (const key in enhancedBotResponses) {
        if (lowerMessage.includes(key)) {
            return enhancedBotResponses[key]
        }
    }

    return enhancedBotResponses["default"]
}

// Send message on button click
chatbotSend.addEventListener("click", sendMessage)

// Send message on Enter key
chatbotInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        sendMessage()
    }
})

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1"
            entry.target.style.transform = "translateY(0)"

            // Add staggered animation for service cards
            if (entry.target.classList.contains("service-card")) {
                const cards = document.querySelectorAll(".service-card")
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = "1"
                        card.style.transform = "translateY(0)"
                    }, index * 200)
                })
            }
        }
    })
}, observerOptions)

// Observe elements for animation
document.querySelectorAll(".service-card, .testimonial-card, .stat").forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(20px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
})

// Button click handlers
document.querySelectorAll(".btn-primary, .btn-secondary").forEach((button) => {
    button.addEventListener("click", function () {
        const buttonText = this.textContent.toLowerCase()

        if (buttonText.includes("consultation") || buttonText.includes("started")) {
            // Simulate opening consultation form
            alert(
                "Thank you for your interest! Our team will contact you within 24 hours to schedule your free consultation.",
            )
        } else if (buttonText.includes("learn more") || buttonText.includes("portfolio")) {
            // Scroll to services section
            document.getElementById("services").scrollIntoView({
                behavior: "smooth",
            })
        }
    })
})

// Add loading animation
window.addEventListener("load", () => {
    document.body.style.opacity = "1"
})

// Initialize
document.body.style.opacity = "0"
document.body.style.transition = "opacity 0.5s ease"
