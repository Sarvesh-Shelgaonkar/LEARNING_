# Payment Flow Documentation

## Overview
This document outlines the payment system implementation for mentorship sessions using Stripe integration.

## 💳 Payment Architecture

### Stripe Integration
- **Provider**: Stripe
- **Payment Methods**: Credit/Debit Cards
- **Currency**: USD
- **Security**: PCI compliant through Stripe
- **Testing**: Stripe test mode for development

### Payment Flow Overview
```
Student selects mentorship session
    ↓
Click "Enroll" button
    ↓
Stripe payment modal opens
    ↓
Enter payment details
    ↓
Payment processing
    ↓
Success: Record enrollment in Firestore
    ↓
Send confirmation email
    ↓
Redirect to session details
```

## 🔧 Stripe Setup

### Environment Configuration
```javascript
// .env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
VITE_STRIPE_SECRET_KEY=sk_test_...
```

### Stripe Configuration
```javascript
// firebase/stripe.js
import { loadStripe } from '@stripe/stripe-js';

export const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
);
```

## 📋 Payment Components

### Payment Modal Component
```javascript
const PaymentModal = ({ session, onSuccess, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePayment = async (paymentMethod) => {
    setLoading(true);
    setError(null);

    try {
      // Create payment intent on backend
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: session.id,
          amount: session.price * 100, // Convert to cents
        }),
      });

      const { clientSecret } = await response.json();

      // Confirm payment with Stripe
      const { error: stripeError } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: paymentMethod,
        }
      );

      if (stripeError) {
        setError(stripeError.message);
      } else {
        // Payment successful
        await recordEnrollment(session.id, paymentMethod.id);
        onSuccess();
      }
    } catch (error) {
      setError('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <h3 className="text-lg font-semibold mb-4">
          Enroll in {session.topic}
        </h3>
        
        <div className="mb-4">
          <p className="text-gray-600">Session: {session.mentorName}</p>
          <p className="text-gray-600">Date: {formatDate(session.date)}</p>
          <p className="text-xl font-bold">${session.price}</p>
        </div>

        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
            },
          }}
        />

        {error && (
          <div className="text-red-500 text-sm mt-2">{error}</div>
        )}

        <div className="flex gap-2 mt-4">
          <button
            onClick={handlePayment}
            disabled={loading}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Pay Now'}
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
```

### Session Card with Payment
```javascript
const SessionCard = ({ session }) => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const { currentUser } = useAuth();

  const handleEnroll = () => {
    if (!currentUser) {
      toast.error('Please login to enroll');
      return;
    }
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = async () => {
    setShowPaymentModal(false);
    toast.success('Successfully enrolled! Check your email for details.');
    // Refresh session data
  };

  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold">{session.topic}</h3>
          <p className="text-gray-600">by {session.mentorName}</p>
          <p className="text-sm text-gray-500">{session.company}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-green-600">
            ${session.price}
          </p>
          <p className="text-sm text-gray-500">
            {session.currentParticipants}/{session.maxParticipants} enrolled
          </p>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-gray-700">{session.description}</p>
        <div className="flex flex-wrap gap-1 mt-2">
          {session.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          <p>Date: {formatDate(session.date)}</p>
          <p>Duration: {session.duration} minutes</p>
        </div>
        
        <button
          onClick={handleEnroll}
          disabled={session.currentParticipants >= session.maxParticipants}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {session.currentParticipants >= session.maxParticipants
            ? 'Full'
            : 'Enroll'}
        </button>
      </div>

      {showPaymentModal && (
        <PaymentModal
          session={session}
          onSuccess={handlePaymentSuccess}
          onClose={() => setShowPaymentModal(false)}
        />
      )}
    </div>
  );
};
```

## 🔄 Payment Processing Flow

### 1. Session Selection
```javascript
const handleSessionSelect = (session) => {
  // Validate session availability
  if (session.currentParticipants >= session.maxParticipants) {
    toast.error('Session is full');
    return;
  }
  
  // Check user authentication
  if (!currentUser) {
    toast.error('Please login to enroll');
    return;
  }
  
  // Open payment modal
  setSelectedSession(session);
  setShowPaymentModal(true);
};
```

### 2. Payment Intent Creation
```javascript
// Backend API endpoint (Firebase Functions)
exports.createPaymentIntent = functions.https.onCall(async (data, context) => {
  // Verify user authentication
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User not authenticated');
  }

  const { sessionId, amount } = data;

  try {
    // Create payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      metadata: {
        sessionId: sessionId,
        userId: context.auth.uid,
      },
    });

    return {
      clientSecret: paymentIntent.client_secret,
    };
  } catch (error) {
    throw new functions.https.HttpsError('internal', 'Payment intent creation failed');
  }
});
```

### 3. Payment Confirmation
```javascript
const confirmPayment = async (paymentMethod, clientSecret) => {
  const { error, paymentIntent } = await stripe.confirmCardPayment(
    clientSecret,
    {
      payment_method: paymentMethod,
    }
  );

  if (error) {
    throw new Error(error.message);
  }

  return paymentIntent;
};
```

### 4. Enrollment Recording
```javascript
const recordEnrollment = async (sessionId, paymentId) => {
  const enrollmentData = {
    sessionId: sessionId,
    userId: currentUser.uid,
    userEmail: currentUser.email,
    paymentStatus: 'completed',
    paymentId: paymentId,
    enrolledAt: serverTimestamp(),
  };

  // Add enrollment to Firestore
  await addDoc(collection(db, 'mentorship_enrollments'), enrollmentData);

  // Update session participant count
  const sessionRef = doc(db, 'mentorship_sessions', sessionId);
  await updateDoc(sessionRef, {
    currentParticipants: increment(1),
  });
};
```

## 📧 Email Notifications

### Payment Success Email
```javascript
const sendPaymentConfirmation = async (enrollment) => {
  const session = await getDoc(doc(db, 'mentorship_sessions', enrollment.sessionId));
  const sessionData = session.data();

  const emailData = {
    to: enrollment.userEmail,
    subject: `Enrollment Confirmed: ${sessionData.topic}`,
    template: 'payment-confirmation',
    data: {
      userName: currentUser.displayName,
      sessionTopic: sessionData.topic,
      mentorName: sessionData.mentorName,
      sessionDate: formatDate(sessionData.date),
      meetingLink: sessionData.meetingLink,
      sessionDuration: sessionData.duration,
    },
  };

  // Send email using Firebase Functions or EmailJS
  await sendEmail(emailData);
};
```

## 🔒 Security Considerations

### Payment Security
- All payment data processed by Stripe
- No sensitive data stored locally
- PCI compliance through Stripe
- Secure API endpoints

### Data Validation
```javascript
const validatePaymentData = (data) => {
  const { sessionId, amount } = data;
  
  if (!sessionId || !amount) {
    throw new Error('Missing required payment data');
  }
  
  if (amount <= 0) {
    throw new Error('Invalid payment amount');
  }
  
  return true;
};
```

### Fraud Prevention
- Payment amount validation
- User authentication required
- Session availability checking
- Rate limiting on payment attempts

## 📊 Payment Analytics

### Payment Metrics
```javascript
const trackPaymentEvent = (event, data) => {
  // Track payment events for analytics
  analytics.logEvent('payment_event', {
    event_type: event,
    session_id: data.sessionId,
    amount: data.amount,
    user_id: data.userId,
  });
};
```

### Success/Failure Tracking
- Payment success rate
- Failed payment reasons
- Average payment time
- User payment behavior

## 🧪 Testing

### Test Cards
```javascript
// Stripe test card numbers
const testCards = {
  success: '4242424242424242',
  decline: '4000000000000002',
  insufficient: '4000000000009995',
};
```

### Test Environment
```javascript
// Use test keys for development
const isTestMode = import.meta.env.DEV;
const stripeKey = isTestMode 
  ? import.meta.env.VITE_STRIPE_TEST_KEY
  : import.meta.env.VITE_STRIPE_LIVE_KEY;
```

## 🔧 Error Handling

### Payment Error Handling
```javascript
const handlePaymentError = (error) => {
  switch (error.code) {
    case 'card_declined':
      toast.error('Payment declined. Please try a different card.');
      break;
    case 'insufficient_funds':
      toast.error('Insufficient funds. Please try a different card.');
      break;
    case 'expired_card':
      toast.error('Card expired. Please use a different card.');
      break;
    default:
      toast.error('Payment failed. Please try again.');
  }
};
```

### Network Error Handling
```javascript
const handleNetworkError = () => {
  toast.error('Network error. Please check your connection and try again.');
};
```

## 📱 Mobile Responsiveness

### Payment Modal Mobile
```javascript
const PaymentModal = ({ session, onSuccess, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white p-4 rounded-lg w-full max-w-md">
        {/* Mobile-optimized payment form */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Complete Payment</h3>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium">Card Information</label>
            <CardElement className="border rounded p-3" />
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={handlePayment}
              className="flex-1 bg-blue-600 text-white py-3 rounded"
            >
              Pay ${session.price}
            </button>
            <button
              onClick={onClose}
              className="px-4 py-3 border rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
```

## 🚀 Production Deployment

### Environment Setup
```javascript
// Production environment variables
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...
VITE_STRIPE_SECRET_KEY=sk_live_...
```

### Security Headers
```javascript
// Add security headers for payment pages
const securityHeaders = {
  'Content-Security-Policy': "frame-src 'self' https://js.stripe.com",
  'X-Frame-Options': 'SAMEORIGIN',
};
```

### Monitoring
- Payment success rate monitoring
- Error tracking and alerting
- Performance monitoring
- Security event logging 