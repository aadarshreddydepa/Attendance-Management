/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef } from 'react';
import { Camera, Users, AlertCircle, CheckCircle, Play, Square, RotateCcw } from 'lucide-react';

interface RecognizedStudent {
  id: string;
  name: string;
  confidence: number;
  timestamp: string;
  photo: string;
}

const FacialRecognition = () => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [recognizedStudents, setRecognizedStudents] = useState<RecognizedStudent[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState('Computer Science Engineering');
  const [selectedSection, setSelectedSection] = useState('A');
  const videoRef = useRef<HTMLVideoElement>(null);
  const [streamError, setStreamError] = useState('');

  const departments = ['Computer Science Engineering', 'Mechanical Engineering', 'Electronics & Communication', 'Civil Engineering'];
  const sections = ['A', 'B', 'C', 'D'];

  // Mock recognized students data
  const mockRecognizedStudents: RecognizedStudent[] = [
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
        await videoRef.current.play();
        setIsStreaming(true);

        // Simulate facial recognition after 3 seconds
        setTimeout(() => {
          setRecognizedStudents(mockRecognizedStudents);
        }, 3000);
      }
    } catch (error: any) {
      console.error('Error accessing camera:', error);
      let errorMessage = 'Unable to access camera. ';
      
      if (error.name === 'NotAllowedError') {
        errorMessage += 'Please grant camera permissions and try again.';
      } else if (error.name === 'NotFoundError') {
        errorMessage += 'No camera device found.';
      } else {
        errorMessage += 'Please check your camera and try again.';
      }
      
      setStreamError(errorMessage);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
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
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Facial Recognition Attendance</h1>
        <p className="text-gray-600">Use AI-powered facial recognition to automatically mark attendance</p>
      </div>

      {/* Alert */}
      <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
        <div className="flex">
          <AlertCircle className="h-5 w-5 text-blue-400" />
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">Development Mode</h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>This interface is prepared for OpenCV integration. In production, you'll need to integrate with a facial recognition backend service that processes video frames and identifies students using trained models.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {sections.map(section => (
                <option key={section} value={section}>Section {section}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {!isStreaming ? (
            <button
              onClick={startCamera}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center"
            >
              <Play className="h-4 w-4 mr-2" />
              Start Camera
            </button>
          ) : (
            <button
              onClick={stopCamera}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 flex items-center"
            >
              <Square className="h-4 w-4 mr-2" />
              Stop Camera
            </button>
          )}

          <button
            onClick={resetRecognition}
            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 flex items-center"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset Recognition
          </button>

          <button
            onClick={markAttendance}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Mark Attendance
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Camera Feed */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900">Camera Feed</h2>
          </div>
          <div className="p-6">
            <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
              {isStreaming ? (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div className="text-center">
                  <Camera className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500">Click "Start Camera" to begin facial recognition</p>
                </div>
              )}
            </div>
            {isStreaming && (
              <div className="mt-4 text-center">
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  ✓ {recognizedStudents.length} students recognized
                </div>
              </div>
            )}
            {streamError && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-700 text-sm">{streamError}</p>
              </div>
            )}
          </div>
        </div>

        {/* Recognition Results */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900">Recognized Students</h2>
          </div>
          <div className="p-6">
            {recognizedStudents.length === 0 ? (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500">No students recognized yet</p>
                <p className="text-sm text-gray-400">Start the camera to begin recognition</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recognizedStudents.map((student) => (
                  <div key={student.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <img
                      src={student.photo}
                      alt={student.name}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{student.name}</h3>
                      <p className="text-sm text-gray-500">{student.id}</p>
                      <p className="text-xs text-gray-400">Recognized at {student.timestamp}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-green-600">
                        {Math.round(student.confidence * 100)}%
                      </p>
                      <p className="text-xs text-gray-500">Confidence</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacialRecognition;
