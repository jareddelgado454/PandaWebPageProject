let selectorIndex = 1;
export const ServiceRequestSteps = [
    {
        element: `.service-form-item-selector${selectorIndex++}`,
        intro: 'You can use this form to make a service request by fullfil these fields. <strong>Remember, you need to attach your car before you make a service request.</strong>',
        tooltipClass: 'myTooltipClass',
        highlightClass: 'myHighlightClass',
    },
    {
        element: `.service-form-item-selector${selectorIndex++}`,
        intro: 'Use this button to get your current location.',
    },
    {
        element: `.service-form-item-selector${selectorIndex++}`,
        intro: `Use this search input address if the previous action does not get your exact location.`,
    },
]