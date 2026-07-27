import React, { useState } from 'react';

export const MobileAppPreview = ({ 
  src = "../export/BuildOptix Mobile (standalone).html" 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleIframeLoad = () => {
    setIsLoaded(true);
  };

  const handleIframeError = () => {
    setHasError(true);
    setIsLoaded(false);
  };

 const [showDownloadMenu, setShowDownloadMenu] = useState(false);

  // States for Range Picker
  const [selectedRange, setSelectedRange] = useState("today"); // 'today', '7d', '30d', 'custom'
  const [showCustomPicker, setShowCustomPicker] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // Handler for Range Button Clicks
  const handleRangeChange = (range) => {
    setSelectedRange(range);
    if (range === "custom") {
      setShowCustomPicker((prev) => !prev);
    } else {
      setShowCustomPicker(false);
      // Yahan aap non-custom range change handle kar sakte ho
      console.log("Selected Range:", range);
    }
  };

  const handleApplyCustomRange = () => {
    if (!fromDate || !toDate) {
      alert("Kripya From aur To dates select karein.");
      return;
    }
    console.log("Custom Range Applied:", { fromDate, toDate });
    setShowCustomPicker(false);
  };



  return (
    <div className="page active" id="pg-mobileapp">



      
      <div
        className="tab-panel active"
        data-page="mobileapp"
        data-tab="0"
        style={{ height: '100%' }}
      >
        {/* Mobile App Standalone Iframe */}
        {!hasError && (
          <iframe
            id="mobileAppFrame"
            src={src}
            loading="lazy"
            title="BuildOptix Mobile app screens"
            onLoad={handleIframeLoad}
            onError={handleIframeError}
            style={{
              display: isLoaded ? 'block' : 'none',
              width: '100%',
              height: 'calc(100vh - 190px)',
              minHeight: '640px',
              border: '1px solid var(--line-2)',
              borderRadius: '10px',
              background: '#04080F',
            }}
          />
        )}

        {/* Fallback Placeholder (Shown while loading or if not bundled) */}
        {(!isLoaded || hasError) && (
          <div
            id="mobileAppPlaceholder"
            style={{
              display: 'flex',
              width: '100%',
              height: 'calc(100vh - 190px)',
              minHeight: '640px',
              border: '1px solid var(--line-2)',
              borderRadius: '10px',
              background: '#04080F',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              color: 'var(--ink-3)',
            }}
          >
            <i
              className="ti ti-device-mobile"
              style={{ fontSize: '32px', color: 'var(--ink-4)' }}
            ></i>
            <div
              style={{
                fontSize: '13px',
                fontWeight: 600,
                color: 'var(--ink-2)',
              }}
            >
              Mobile app preview not bundled in this build
            </div>
            <div
              style={{
                fontSize: '11px',
                maxWidth: '320px',
                textAlign: 'center',
                lineHeight: '1.6',
              }}
            >
              The embedded preview was removed to keep this console lightweight and
              fast-loading. Attach the mobile export separately to view it here.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileAppPreview;