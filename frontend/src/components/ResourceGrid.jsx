import { FileText, Play, DownloadCloud, Lock } from 'lucide-react';
import { Document, Page } from 'react-pdf';
import './ResourceGrid.css';

const ResourceGrid = ({ resources, onOpen }) => {
  if (resources.length === 0) {
    return (
      <div className="rg-empty">
        <p>No resources found in this section yet.</p>
      </div>
    );
  }

  const getActionDetails = (actionType) => {
    switch (actionType) {
      case 'download':
        return { label: 'Download PDF →', icon: <DownloadCloud size={48} className="rg-icon" /> };
      case 'video':
        return { label: 'Watch Video →', icon: <Play size={48} className="rg-icon" /> };
      case 'flipbook':
      default:
        return { label: 'Read Book →', icon: <FileText size={48} className="rg-icon" /> };
    }
  };

  return (
    <div className="rg-grid">
      {resources.map((res) => {
        const action = getActionDetails(res.actionType);
        const hasPdfPreview = res.fileUrl && res.actionType !== 'video';
        const isMissing = !res.fileUrl;

        const actionLabel = isMissing ? (
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#94a3b8', fontWeight: '600' }}>
            <FileText size={14} /> Coming Soon
          </span>
        ) : action.label;

        return (
          <div key={res.id} className="rg-card" onClick={() => onOpen(res)}>
            <div className="rg-cover default-bg">
              {hasPdfPreview && (
                <Document 
                  file={res.fileUrl} 
                  loading={<div style={{ opacity: 0.5 }}>Loading...</div>}
                  className="rg-pdf-preview"
                >
                  <Page 
                    pageNumber={1} 
                    width={220} 
                    renderTextLayer={false} 
                    renderAnnotationLayer={false}
                  />
                </Document>
              )}
              {res.actionType === 'video' && res.fileUrl && (
                <video 
                  src={res.fileUrl} 
                  className="rg-pdf-preview" 
                  style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                  controlsList="nodownload"
                  onContextMenu={(e) => e.preventDefault()}
                />
              )}
              {isMissing && (
                <>
                  <span className="rg-spine" />
                  {action.icon}
                  <div style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(15, 23, 42, 0.75)', padding: '8px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', backdropFilter: 'blur(4px)' }}>
                    <FileText size={18} />
                  </div>
                </>
              )}
            </div>
            <div className="rg-info">
              <span className="rg-cat">{res.category}</span>
              <h4 className="rg-title">{res.title}</h4>
              <span className="rg-action">{actionLabel}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ResourceGrid;
