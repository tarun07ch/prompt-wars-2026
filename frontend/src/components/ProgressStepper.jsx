import React from 'react';

const CHECK_ICON = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 8.5L6.5 12L13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/**
 * ProgressStepper
 * @param {string[]} steps  - Step labels
 * @param {number}   current - 1-based active step index
 */
export default function ProgressStepper({ steps, current }) {
  return (
    <nav aria-label="Progress" className="stepper">
      {steps.map((label, idx) => {
        const stepNum = idx + 1;
        const isDone   = stepNum < current;
        const isActive = stepNum === current;
        const cls = `stepper-step${isDone ? ' done' : ''}${isActive ? ' active' : ''}`;

        return (
          <div key={label} className={cls} aria-current={isActive ? 'step' : undefined}>
            <div className="stepper-circle" aria-label={`Step ${stepNum}: ${label}${isDone ? ' – completed' : isActive ? ' – current' : ''}`}>
              {isDone ? CHECK_ICON : stepNum}
            </div>
            <span className="stepper-label">{label}</span>
          </div>
        );
      })}
    </nav>
  );
}
