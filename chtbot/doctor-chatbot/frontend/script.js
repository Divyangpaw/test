let currentState = 'initial';
let userSymptom = '';

function sendMessage() {
    const input = document.getElementById('userInput');
    const message = input.value.trim();
    
    if (message === '') return;
    
    displayMessage(message, 'user');
    processMessage(message);
    
    input.value = '';
}

function displayMessage(text, sender) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function processMessage(message) {
    const lowerMessage = message.toLowerCase();
    
    switch(currentState) {
        case 'initial':
            handleInitialState(lowerMessage);
            break;
        case 'awaiting_date':
            handleDateInput(message);
            break;
        case 'awaiting_time':
            handleTimeInput(message);
            break;
    }
}

function handleInitialState(message) {
    const symptoms = {
        fever: ['fever', 'temperature', 'hot', 'cold', 'chills', 'shivering', 'sweating'],
        
        headache: ['headache', 'head pain', 'migraine', 'head pressure', 'tension', 'sinus'],
        
        stomach: ['stomach', 'vomit', 'vomiting', 'nausea', 'dizzy', 'dizziness', 
                 'indigestion', 'acid reflux', 'heartburn', 'bloating', 'diarrhea', 
                 'constipation', 'abdominal pain', 'gastric'],
        
        heart: ['heart', 'chest pain', 'palpitation', 'shortness of breath', 
               'breathing difficulty', 'chest tightness', 'irregular heartbeat', 
               'high blood pressure', 'low blood pressure'],
        
        skin: ['skin', 'rash', 'itching', 'allergy', 'acne', 'eczema', 'psoriasis', 
               'hives', 'blisters', 'moles', 'skin infection', 'dermatitis'],
        
        eye: ['eye', 'vision', 'blurry', 'eye pain', 'red eye', 'itchy eyes', 
              'dry eyes', 'watery eyes', 'eye infection', 'eye strain'],
        
        ear: ['ear', 'hearing', 'ear pain', 'ear infection', 'tinnitus', 'vertigo', 
              'ear discharge', 'hearing loss', 'ear ringing'],
        
        throat: ['throat', 'sore throat', 'cough', 'hoarseness', 'difficulty swallowing', 
                'tonsillitis', 'strep throat', 'throat infection'],
        
        dental: ['tooth', 'teeth', 'gum', 'dental pain', 'cavity', 'toothache', 
                'bleeding gums', 'sensitive teeth', 'jaw pain'],
        
        respiratory: ['breathing', 'asthma', 'wheezing', 'shortness of breath', 'cough', 
                     'bronchitis', 'pneumonia', 'respiratory infection'],
        
        joints: ['joint pain', 'arthritis', 'swelling', 'stiffness', 'back pain', 
                'neck pain', 'shoulder pain', 'knee pain', 'muscle pain'],
        
        neurological: ['numbness', 'tingling', 'seizure', 'tremors', 'memory loss', 
                      'confusion', 'dizziness', 'balance problems', 'fainting'],
        
        mental: ['anxiety', 'depression', 'stress', 'panic attacks', 'mood swings', 
                'insomnia', 'sleep problems', 'mental health'],
        
        diabetes: ['diabetes', 'high sugar', 'low sugar', 'excessive thirst', 
                  'frequent urination', 'fatigue', 'blurred vision'],
        
        allergies: ['allergy', 'allergic reaction', 'hay fever', 'sneezing', 'runny nose', 
                   'itchy eyes', 'food allergy', 'skin allergy'],
        
        urinary: ['urinary', 'bladder', 'kidney', 'UTI', 'frequent urination', 
                 'burning sensation', 'kidney stones'],
        
        reproductive: ['menstrual', 'pregnancy', 'fertility', 'reproductive health', 
                      'gynecological', 'sexual health'],
        
        endocrine: ['thyroid', 'hormonal', 'weight gain', 'weight loss', 'metabolism', 
                   'growth issues', 'hormonal imbalance']
    };

    for (let condition in symptoms) {
        if (symptoms[condition].some(keyword => message.toLowerCase().includes(keyword))) {
            userSymptom = condition;
            currentState = 'awaiting_date';
            
            const doctorTypes = {
                fever: 'General Physician',
                headache: 'Neurologist',
                stomach: 'Gastroenterologist',
                heart: 'Cardiologist',
                skin: 'Dermatologist',
                eye: 'Ophthalmologist',
                ear: 'ENT Specialist',
                throat: 'ENT Specialist',
                dental: 'Dentist',
                respiratory: 'Pulmonologist',
                joints: 'Orthopedic Specialist',
                neurological: 'Neurologist',
                mental: 'Psychiatrist',
                diabetes: 'Endocrinologist',
                allergies: 'Allergist',
                urinary: 'Urologist',
                reproductive: 'Gynecologist',
                endocrine: 'Endocrinologist'
            };

            displayMessage(`I understand you're experiencing ${condition}-related symptoms. I'll help you schedule an appointment with a ${doctorTypes[condition]}. Please provide your preferred date.`, 'bot');
            return;
        }
    }
    
    displayMessage("Could you describe your symptoms in more detail? You can mention any pain, discomfort, or specific health concerns.", 'bot');
}


function handleDateInput(date) {
    currentState = 'awaiting_time';
    displayMessage("What time would you prefer for your appointment?", 'bot');
}

function handleTimeInput(time) {
    displayMessage("Great! I've scheduled your appointment. You'll receive a confirmation email shortly.", 'bot');
    currentState = 'initial';
}

// Event Listeners
document.getElementById('userInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

// Initial greeting
window.onload = () => {
    setTimeout(() => {
        displayMessage("How are you feeling today? Please describe your symptoms.", 'bot');
    }, 500);
};
