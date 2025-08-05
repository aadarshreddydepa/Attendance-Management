import React, { useState, useRef } from 'react';
import { Camera, Video, Users, AlertCircle, CheckCircle, Upload, Play, Square, RotateCcw } from 'lucide-react';

const FacialRecognition = () => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [recognizedStudents, setRecognizedStudents] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('Computer Science Engineering');
  const [selectedSection, setSelectedSection] = useState('A');
  const videoRef = useRef(null);
  const [streamError, setStreamError] = useState('');

  const departments = ['Computer Science Engineering', 'Mechanical Engineering', 'Electronics & Communication', 'Civil Engineering'];
  const sections = ['A', 'B', 'C', 'D'];

  // Mock recognized students data
  const mockRecognizedStudents = [
    {
      id: 'CSE001',
      name: 'Alice Johnson',
      confidence: 0.98,
      timestamp: new Date().toLocaleTimeString(),
      photo: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      id: 'CSE002',
      name: 'Bob Smith',
      confidence: 0.95,
      timestamp: new Date().toLocaleTimeString(),
      photo: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    }
  ];

  const startCamera = async () => {
    try {
      setStreamError('');
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user'
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsStreaming(true);
        
        // Simulate facial recognition after 3 seconds
        setTimeout(() => {
          setRecognizedStudents(mockRecognizedStudents);
        }, 3000);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      setStreamError('Unable to access camera. Please ensure camera permissions are granted.');
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsStreaming(false);
    setRecognizedStudents([]);
  };

  const resetRecognition = () => {
    setRecognizedStudents([]);
  };

  const markAttendance = () => {
    if (recognizedStudents.length === 0) {
      alert('No students recognized yet. Please wait for facial recognition to complete.');
      return;
    }
    
    // Here you would save attendance to database
    alert(`Attendance marked for ${recognizedStudents.length} students successfully!`);
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Facial Recognition Attendance</h2>
        <p className="text-gray-600">Use AI-powered facial recognition to automatically mark attendance</p>
      </div>

      {/* Important Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8">
        <div className="flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-medium text-amber-800">Integration Required</h3>
            <p className="text-sm text-amber-700 mt-1">
              This interface is prepared for OpenCV integration. In production, you'll need to integrate with a facial recognition backend service 
              that processes video frames and identifies students using trained models.
            </p>
          </div>
        </div>
      </div>

      {/* Class Selection */}
      <div className="bg-gray-50 rounded-xl p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Class</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Section</label>
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {sections.map(section => (
                <option key={section} value={section}>Section {section}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Camera Feed */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Camera Feed</h3>
            <div className="flex space-x-2">
              {!isStreaming ? (
                <button
                  onClick={startCamera}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center space-x-2"
                >
                  <Play className="h-4 w-4" />
                  <span>Start Camera</span>
                </button>
              ) : (
                <>
                  <button
                    onClick={resetRecognition}
                    className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors duration-200 flex items-center space-x-2"
                  >
                    <RotateCcw className="h-4 w-4" />
                    <span>Reset</span>
                  </button>
                  <button
                    onClick={stopCamera}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center space-x-2"
                  >
                    <Square className="h-4 w-4" />
                    <span>Stop Camera</span>
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="relative bg-gray-900 rounded-lg overflow-hidden" style={{ aspectRatio: '16/9' }}>
            {!isStreaming ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Camera className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400">Click "Start Camera" to begin facial recognition</p>
                </div>
              </div>
            ) : (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
                {isStreaming && (
                  <div className="absolute top-4 left-4">
                    <div className="flex items-center space-x-2 bg-red-600 text-white px-3 py-1 rounded-full text-sm">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      <span>LIVE</span>
                    </div>
                  </div>
                )}
                
                {/* Face detection overlay would be added here in production */}
                {recognizedStudents.length > 0 && (
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-green-600 text-white px-4 py-2 rounded-lg">
                      <p className="text-sm font-medium">✓ {recognizedStudents.length} students recognized</p>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {streamError && (
            <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-700 text-sm">{streamError}</p>
            </div>
          )}
        </div>

        {/* Recognition Results */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recognized Students</h3>
            {recognizedStudents.length > 0 && (
              <button
                onClick={markAttendance}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
              >
                <CheckCircle className="h-4 w-4" />
                <span>Mark Attendance</span>
              </button>
            )}
          </div>

          {recognizedStudents.length === 0 ? (
            <div className="text-center py-12">
              <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No students recognized yet</p>
              <p className="text-gray-400 text-sm mt-1">Start the camera to begin recognition</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recognizedStudents.map((student, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <img 
                    src={student.photo} 
                    alt={student.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-green-300"
                  />
                  <div className="flex-1">
                    <h4 className="text-lg font-medium text-gray-900">{student.name}</h4>
                    <p className="text-sm text-gray-600 font-mono">{student.id}</p>
                    <p className="text-xs text-gray-500">Recognized at {student.timestamp}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-green-700">
                        {Math.round(student.confidence * 100)}%
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">Confidence</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Technical Information */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">Integration Guidelines</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-blue-800">
          <div>
            <h4 className="font-medium mb-2">Required Components:</h4>
            <ul className="space-y-1 text-blue-700">
              <li>• OpenCV for face detection and recognition</li>
              <li>• Pre-trained face recognition models</li>
              <li>• Student face dataset for training</li>
              <li>• Real-time video processing backend</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Implementation Notes:</h4>
            <ul className="space-y-1 text-blue-700">
              <li>• Train models with multiple photos per student</li>
              <li>• Implement confidence thresholds ({'>'}80% recommended)</li>
              <li>• Add manual verification for low confidence matches</li>
              <li>• Consider lighting and angle variations</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacialRecognition;