import { ArrowRight, ChevronDown, ChevronUp, Circle, Home, MapPin, Plus, Square, Triangle, X } from 'lucide-react-native';
import { useState } from 'react';

const RoadSignsApp = () => {
    const [currentPage, setCurrentPage] = useState('home');
    const [expandedSection, setExpandedSection] = useState('directional');
    const [selectedSign, setSelectedSign] = useState(null);
    const [showAddSignModal, setShowAddSignModal] = useState(false);
    const [customSigns, setCustomSigns] = useState([]);

    const toggleSection = (section) => {
        setExpandedSection(expandedSection === section ? null : section);
    };

    const showSignDescription = (sign, category) => {
        setSelectedSign({ ...sign, category });
    };

    const addCustomSign = (signData) => {
        const newSign = {
            ...signData,
            id: Date.now(),
            type: signData.name.toLowerCase().replace(/\s+/g, '-')
        };
        setCustomSigns([...customSigns, newSign]);
        setShowAddSignModal(false);
    };

    const getSignDescription = (type, category) => {
        const descriptions = {
            order: {
                'stop': 'Complete stop required at intersection. Vehicle must come to a full stop before proceeding.',
                'yield': 'Give way to other traffic. Slow down and prepare to stop if necessary.',
                'no-entry': 'Entry prohibited. Vehicles are not allowed to enter this area or road.',
                'speed-limit': 'Maximum speed limit. Do not exceed the posted speed (50 km/h shown).',
                'no-parking': 'Parking prohibited in this area. Vehicles may not stop or park here.',
                'one-way': 'One-way traffic only. All vehicles must travel in the indicated direction.',
                'no-turn': 'Turning prohibited. Vehicles cannot make the indicated turn movement.'
            },
            danger: {
                'sharp-curve': 'Sharp curve ahead. Reduce speed and prepare for a tight turn.',
                'steep-hill': 'Steep gradient ahead. Use appropriate gear and exercise caution.',
                'narrow-road': 'Road narrows ahead. Prepare for reduced lane width.',
                'pedestrian': 'Pedestrian crossing ahead. Watch for people crossing the road.',
                'school': 'School zone ahead. Reduce speed and watch for children.',
                'animal': 'Animal crossing area. Watch for wildlife on or near the roadway.',
                'intersection': 'Intersection ahead. Prepare to stop or yield to cross traffic.'
            },
            information: {
                'hospital': 'Hospital nearby. Medical facility available in this direction.',
                'gas-station': 'Fuel station available. Petrol/gas services in this area.',
                'restaurant': 'Restaurant or food services. Dining facilities available nearby.',
                'hotel': 'Accommodation available. Hotel or lodging services in this area.',
                'parking': 'Parking area available. Designated parking facility nearby.',
                'phone': 'Telephone services. Public phone or communication facility available.',
                'toilet': 'Restroom facilities. Public toilets or washroom services available.'
            },
            location: {
                'city-limit': 'City boundary marker. Entering or leaving municipal limits.',
                'highway': 'Highway designation. Major road identifier (A1 shown).',
                'exit-number': 'Highway exit number. Numbered exit for navigation reference.',
                'distance': 'Distance marker. Shows remaining distance to destination (5km shown).',
                'route': 'Route number. National or regional road designation (N1 shown).',
                'street': 'Street identification. Local road or street name marker.',
                'junction': 'Road junction ahead. Multiple roads intersect at this point.'
            },
            directional: {
                'curve-left': 'Curve to the left. Road bends in the left direction ahead.',
                'curve-right': 'Curve to the right. Road bends in the right direction ahead.',
                'straight': 'Continue straight. Maintain current direction of travel.',
                'cross': 'Crossroads ahead. Four-way intersection with crossing traffic.',
                'merge-left': 'Merge left. Traffic from right joins from this direction.',
                'merge-right': 'Merge right. Traffic from left joins from this direction.',
                'split': 'Road splits ahead. Choose appropriate lane for desired direction.',
                'lanes': 'Multiple lanes. Road has parallel traffic lanes.',
                'turn-left': 'Turn left. Change direction to the left at intersection.',
                'turn-right': 'Turn right. Change direction to the right at intersection.',
                'u-turn': 'U-turn permitted. 180-degree turn allowed at this location.',
                'roundabout': 'Roundabout ahead. Circular intersection with yield rules.',
                'exit': 'Highway exit. Leave main roadway at this point.',
                'merge': 'Merge traffic. Vehicles joining from acceleration lane.'
            }
        };
        return descriptions[category]?.[type] || 'Road sign description not available.';
    };

    const RoadSign = ({ type, category, showDescription = false }) => {
        const customSign = customSigns.find(sign => sign.type === type && sign.category === category);

        const getSignContent = () => {
            if (customSign) {
                return <div className="text-xs font-bold">{customSign.name.substring(0, 3).toUpperCase()}</div>;
            }

            if (category === 'order') {
                switch (type) {
                    case 'stop':
                        return <div className="text-white font-bold text-xs">STOP</div>;
                    case 'yield':
                        return <div className="text-red-600 text-lg">△</div>;
                    case 'no-entry':
                        return <div className="text-white text-lg">⊘</div>;
                    case 'speed-limit':
                        return <div className="text-black text-xs">50</div>;
                    case 'no-parking':
                        return <div className="text-red-600 text-lg">P̸</div>;
                    case 'one-way':
                        return <div className="text-white">→</div>;
                    case 'no-turn':
                        return <div className="text-red-600 text-lg">⤴̸</div>;
                    default:
                        return <div className="text-white">○</div>;
                }
            } else if (category === 'danger') {
                switch (type) {
                    case 'sharp-curve':
                        return <div className="text-black text-lg">⤴</div>;
                    case 'steep-hill':
                        return <div className="text-black text-lg">⟋</div>;
                    case 'narrow-road':
                        return <div className="text-black text-lg">||</div>;
                    case 'pedestrian':
                        return <div className="text-black text-lg">🚶</div>;
                    case 'school':
                        return <div className="text-black text-xs">SCH</div>;
                    case 'animal':
                        return <div className="text-black text-lg">🦌</div>;
                    case 'intersection':
                        return <div className="text-black text-lg">✕</div>;
                    default:
                        return <div className="text-black">⚠</div>;
                }
            } else if (category === 'information') {
                switch (type) {
                    case 'hospital':
                        return <div className="text-white text-lg">H</div>;
                    case 'gas-station':
                        return <div className="text-white text-lg">⛽</div>;
                    case 'restaurant':
                        return <div className="text-white text-lg">🍴</div>;
                    case 'hotel':
                        return <div className="text-white text-lg">🏨</div>;
                    case 'parking':
                        return <div className="text-white text-lg">P</div>;
                    case 'phone':
                        return <div className="text-white text-lg">📞</div>;
                    case 'toilet':
                        return <div className="text-white text-lg">WC</div>;
                    default:
                        return <div className="text-white">ℹ</div>;
                }
            } else if (category === 'location') {
                switch (type) {
                    case 'city-limit':
                        return <div className="text-black text-xs">CITY</div>;
                    case 'highway':
                        return <div className="text-white text-xs">A1</div>;
                    case 'exit-number':
                        return <div className="text-black text-lg">23</div>;
                    case 'distance':
                        return <div className="text-black text-xs">5km</div>;
                    case 'route':
                        return <div className="text-white text-xs">N1</div>;
                    case 'street':
                        return <div className="text-black text-xs">ST</div>;
                    case 'junction':
                        return <div className="text-black text-lg">⊕</div>;
                    default:
                        return <div className="text-black">📍</div>;
                }
            } else { // directional
                switch (type) {
                    case 'curve-left':
                        return <div className="transform rotate-180">↰</div>;
                    case 'curve-right':
                        return <div>↰</div>;
                    case 'straight':
                        return <div>↑</div>;
                    case 'cross':
                        return <div className="text-lg">+</div>;
                    case 'merge-left':
                        return <div className="transform rotate-45">↗</div>;
                    case 'merge-right':
                        return <div className="transform -rotate-45">↖</div>;
                    case 'split':
                        return <div className="text-lg">Y</div>;
                    case 'lanes':
                        return <div className="text-xs">||</div>;
                    case 'turn-left':
                        return <div>←</div>;
                    case 'turn-right':
                        return <div>→</div>;
                    case 'u-turn':
                        return <div className="text-lg">↩</div>;
                    case 'roundabout':
                        return <div className="text-lg">⭕</div>;
                    case 'exit':
                        return <div className="transform rotate-45">↗</div>;
                    case 'merge':
                        return <div className="text-lg">⚏</div>;
                    default:
                        return <div>→</div>;
                }
            }
        };

        const getSignStyle = () => {
            if (category === 'order') {
                if (type === 'stop') {
                    return "bg-red-600 border-2 border-red-800 rounded-lg";
                } else if (type === 'yield') {
                    return "bg-white border-2 border-red-600 rounded-lg";
                } else if (type === 'speed-limit') {
                    return "bg-white border-2 border-red-600 rounded-full";
                } else {
                    return "bg-red-600 border-2 border-red-800 rounded-full";
                }
            } else if (category === 'danger') {
                return "bg-yellow-400 border-2 border-red-600 rounded-lg transform rotate-45";
            } else if (category === 'information') {
                return "bg-blue-600 border-2 border-blue-800 rounded-lg";
            } else if (category === 'location') {
                if (type === 'highway' || type === 'route') {
                    return "bg-green-600 border-2 border-green-800 rounded-lg";
                } else {
                    return "bg-white border-2 border-black rounded-lg";
                }
            } else { // directional
                return "bg-yellow-400 border-2 border-black rounded-lg";
            }
        };

        const signData = {
            type,
            category,
            description: getSignDescriptionWithCustom(type, category),
            name: customSign ? customSign.name : type.replace('-', ' ')
        };

        return (
            <button
                onClick={() => showDescription && showSignDescription(signData, category)}
                className={`${getSignStyle()} w-12 h-12 flex items-center justify-center text-black font-bold text-xl hover:opacity-80 transition-opacity`}
            >
                <div className={category === 'danger' ? 'transform -rotate-45' : ''}>
                    {getSignContent()}
                </div>
            </button>
        );
    };

    const SignCategory = ({ title, icon, isExpanded, onToggle, children }) => (
        <div className="bg-white rounded-lg border border-gray-200 mb-3">
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between p-4 text-left"
            >
                <div className="flex items-center gap-3">
                    <div className="text-gray-600">{icon}</div>
                    <span className="text-gray-800 font-medium">{title}</span>
                </div>
                {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-gray-600" />
                ) : (
                    <ChevronDown className="w-5 h-5 text-gray-600" />
                )}
            </button>
            {isExpanded && children && (
                <div className="px-4 pb-4">
                    {children}
                </div>
            )}
        </div>
    );

    const signCategories = {
        order: ['stop', 'yield', 'no-entry', 'speed-limit', 'no-parking', 'one-way', 'no-turn'],
        danger: ['sharp-curve', 'steep-hill', 'narrow-road', 'pedestrian', 'school', 'animal', 'intersection'],
        information: ['hospital', 'gas-station', 'restaurant', 'hotel', 'parking', 'phone', 'toilet'],
        location: ['city-limit', 'highway', 'exit-number', 'distance', 'route', 'street', 'junction'],
        directional: [
            'curve-left', 'curve-right', 'straight', 'cross', 'merge-left', 'merge-right', 'split',
            'lanes', 'turn-left', 'turn-right', 'u-turn', 'roundabout', 'exit', 'merge'
        ]
    };

    // Get all signs including custom ones
    const getAllSigns = (category) => {
        const defaultSigns = signCategories[category] || [];
        const customSignsForCategory = customSigns
            .filter(sign => sign.category === category)
            .map(sign => sign.type);
        return [...defaultSigns, ...customSignsForCategory];
    };

    // Get sign description including custom ones
    const getSignDescriptionWithCustom = (type, category) => {
        // Check if it's a custom sign first
        const customSign = customSigns.find(sign => sign.type === type && sign.category === category);
        if (customSign) {
            return customSign.description;
        }
        // Otherwise use default description
        return getSignDescription(type, category);
    };

    const HomeScreen = () => (
        <>
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-4 py-6">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <h1 className="text-xl font-semibold text-gray-800">Road Bro</h1>
                </div>
            </div>

            {/* Content */}
            <div className="px-4 py-4 pb-20">
                {/* Order signs */}
                <SignCategory
                    title="Order signs"
                    icon={<Circle className="w-5 h-5" />}
                    isExpanded={expandedSection === 'order'}
                    onToggle={() => toggleSection('order')}
                >
                    <div className="grid grid-cols-7 gap-2 mt-2">
                        {getAllSigns('order').map((sign, index) => (
                            <RoadSign key={index} type={sign} category="order" showDescription={true} />
                        ))}
                    </div>
                </SignCategory>

                {/* Danger signs */}
                <SignCategory
                    title="Danger signs"
                    icon={<Triangle className="w-5 h-5" />}
                    isExpanded={expandedSection === 'danger'}
                    onToggle={() => toggleSection('danger')}
                >
                    <div className="grid grid-cols-7 gap-2 mt-2">
                        {getAllSigns('danger').map((sign, index) => (
                            <RoadSign key={index} type={sign} category="danger" showDescription={true} />
                        ))}
                    </div>
                </SignCategory>

                {/* Information signs */}
                <SignCategory
                    title="Information signs"
                    icon={<Square className="w-5 h-5" />}
                    isExpanded={expandedSection === 'information'}
                    onToggle={() => toggleSection('information')}
                >
                    <div className="grid grid-cols-7 gap-2 mt-2">
                        {getAllSigns('information').map((sign, index) => (
                            <RoadSign key={index} type={sign} category="information" showDescription={true} />
                        ))}
                    </div>
                </SignCategory>

                {/* Location signs */}
                <SignCategory
                    title="Location signs"
                    icon={<Square className="w-5 h-5" />}
                    isExpanded={expandedSection === 'location'}
                    onToggle={() => toggleSection('location')}
                >
                    <div className="grid grid-cols-7 gap-2 mt-2">
                        {getAllSigns('location').map((sign, index) => (
                            <RoadSign key={index} type={sign} category="location" showDescription={true} />
                        ))}
                    </div>
                </SignCategory>

                {/* Directional signs */}
                <SignCategory
                    title="Directional signs"
                    icon={<ArrowRight className="w-5 h-5" />}
                    isExpanded={expandedSection === 'directional'}
                    onToggle={() => toggleSection('directional')}
                >
                    <div className="grid grid-cols-7 gap-2 mt-2">
                        {getAllSigns('directional').map((sign, index) => (
                            <RoadSign key={index} type={sign} category="directional" showDescription={true} />
                        ))}
                    </div>
                </SignCategory>
            </div>
        </>
    );

    const SignDescriptionModal = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-sm w-full p-6">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 capitalize">
                        {selectedSign?.name || selectedSign?.type?.replace('-', ' ')} Sign
                    </h3>
                    <button
                        onClick={() => setSelectedSign(null)}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex justify-center mb-4">
                    <RoadSign
                        type={selectedSign?.type}
                        category={selectedSign?.category}
                        showDescription={false}
                    />
                </div>

                <p className="text-gray-600 text-sm leading-relaxed">
                    {selectedSign?.description}
                </p>

                <div className="mt-4 text-xs text-gray-500 capitalize">
                    Category: {selectedSign?.category} signs
                </div>
            </div>
        </div>
    );

    const AddSignModal = () => {
        const [newSignData, setNewSignData] = useState({
            category: 'order',
            name: '',
            description: ''
        });

        const handleInputChange = (field, value) => {
            setNewSignData(prev => ({ ...prev, [field]: value }));
        };

        const handleSubmit = () => {
            if (newSignData.name.trim() && newSignData.description.trim()) {
                addCustomSign(newSignData);
                setNewSignData({ category: 'order', name: '', description: '' });
            }
        };

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-lg max-w-sm w-full p-6">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-semibold text-gray-800">Add New Sign</h3>
                        <button
                            onClick={() => setShowAddSignModal(false)}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Sign Category
                            </label>
                            <select
                                value={newSignData.category}
                                onChange={(e) => handleInputChange('category', e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            >
                                <option value="order">Order signs</option>
                                <option value="danger">Danger signs</option>
                                <option value="information">Information signs</option>
                                <option value="location">Location signs</option>
                                <option value="directional">Directional signs</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Sign Name
                            </label>
                            <input
                                type="text"
                                value={newSignData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                placeholder="Enter sign name"
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description
                            </label>
                            <textarea
                                value={newSignData.description}
                                onChange={(e) => handleInputChange('description', e.target.value)}
                                placeholder="Enter sign description"
                                rows="3"
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>

                        <div className="flex gap-2 pt-2">
                            <button
                                onClick={() => setShowAddSignModal(false)}
                                className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={!newSignData.name.trim() || !newSignData.description.trim()}
                                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                Add Sign
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {currentPage === 'home' && <HomeScreen />}

            {/* Sign Description Modal */}
            {selectedSign && <SignDescriptionModal />}

            {/* Add Sign Modal */}
            {showAddSignModal && <AddSignModal />}

            {/* Floating Action Button */}
            {currentPage === 'home' && (
                <div className="fixed bottom-20 right-4">
                    <button
                        onClick={() => setShowAddSignModal(true)}
                        className="bg-blue-800 hover:bg-blue-900 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition-colors"
                    >
                        <Plus className="w-6 h-6" />
                    </button>
                </div>
            )}

            {/* Bottom Navigation */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
                <div className="flex items-center justify-center py-3">
                    <button
                        onClick={() => setCurrentPage('home')}
                        className={`flex flex-col items-center gap-1 ${currentPage === 'home' ? 'text-blue-600' : 'text-gray-600'}`}
                    >
                        <Home className="w-6 h-6" />
                        <span className="text-xs">Home</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RoadSignsApp;