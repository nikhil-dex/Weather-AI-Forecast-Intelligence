# Weather AI

## Overview

Weather AI is an explainable weather forecasting interface focused on future temperature forecasts, forecast uncertainty, baseline comparison, historical evaluation, failure analysis, and model/data transparency. It presents a reproducible Delhi forecast workflow using centrally defined future scenarios and a separate set of historical evaluation information.

The interface demonstrates how a forecast can be configured and reviewed. The displayed future values are selected from predefined scenarios; a trained forecasting model is not run to produce them, and the application does not retrieve current weather observations.

## Features

- Five predefined Delhi maximum-temperature target dates, from September 29 through October 3, 2026.
- Forecast horizons from 24 to 120 hours, associated with their target dates.
- Point forecasts, uncertainty ranges, and persistence-baseline comparisons.
- Forecast and uncertainty charts with matching scenario values.
- Upcoming forecast cards and a synchronized Overview dashboard.
- Historical evaluation summaries, including MAE, RMSE, baseline comparison, interval coverage, and representative failure cases.
- Model configuration, feature groups, evaluation period, provenance, and limitations information.
- Responsive navigation, labeled controls, keyboard focus indicators, and accessible generation status updates.
- Deterministic scenario selection and a fixed reference date for reproducibility.

## Forecast Workflow

```text
Forecast configuration
        ↓
Scenario selection
        ↓
Staged forecast generation
        ↓
Forecast and uncertainty range
        ↓
Baseline comparison
        ↓
Historical evaluation
```

**Forecast** refers to a future target date in the predefined scenario set. Those dates do not have observed outcomes in this interface.

**Evaluation** refers to the separately presented historical forecast outcomes, where observations are available for comparison. Generating a future forecast does not change historical evaluation metrics.

## Application Structure

Weather AI has four routes:

- `/` — Overview of the selected forecast, upcoming dates, charts, and historical performance summary.
- `/forecast` — Target-date selection, staged generation, forecast details, uncertainty, baseline, and upcoming forecast cards.
- `/evaluation` — Historical outcomes, MAE and RMSE, baseline metrics, interval coverage, error distribution, and representative cases.
- `/data-model` — Dataset metadata, model configuration, feature groups, evaluation method, intended use, and limitations.

## How to Use

1. Open Weather AI and review the default Delhi forecast.
2. Open **Forecast** and select a target date from the available dates.
3. Confirm the forecast horizon shown for that date.
4. Click **Generate Forecast** and follow the brief progress stages.
5. Review the predicted maximum temperature, expected range, uncertainty, and baseline.
6. Reset to the default September 29, 2026 target with **Reset**.
7. Open **Evaluation** to review historical forecast outcomes.
8. Open **Data & Model** to inspect the documented setup, evaluation approach, and limitations.

The selected scenario is shared across routes while navigating the application. A full page reload starts from the fixed default forecast again.

## Forecast Interface

The default forecast is issued on September 28, 2026, for September 29, 2026, at a 24-hour horizon. Available target dates and corresponding horizons are:

| Target date | Horizon |
| --- | ---: |
| September 29, 2026 | 24 hours |
| September 30, 2026 | 48 hours |
| October 1, 2026 | 72 hours |
| October 2, 2026 | 96 hours |
| October 3, 2026 | 120 hours |

The selected location is Delhi, India, and the target is maximum temperature. The issue date and target dates are explicit scenario values, not dates calculated from the computer’s current date.

Generation uses a short staged client-side flow to select and display the matching predefined scenario. Its generated timestamp records when the button was used; it is not a weather observation timestamp.

## Evaluation

The Evaluation route presents the included historical evaluation information for the 2025 holdout period. It reports model MAE and RMSE, persistence-baseline comparisons, prediction interval coverage, selected forecast outcomes, error distribution, and representative misses and successful predictions.

These summaries are static evaluation information. They are not recalculated when a future scenario is selected or generated. Future forecasts show “Observed: Not available yet” and do not display a forecast error.

## Data & Model

The Data & Model route displays the documented configuration: Random Forest Regression, version 1.0, 100 trees, and 18 listed input variables across temperature, atmospheric, wind, temporal, and lag-feature groups. It describes a 24-hour primary horizon and the predefined 24-, 48-, 72-, 96-, and 120-hour future scenarios.

The page also describes metadata for a Delhi daily historical reference period from 2021–2025 and a chronological 2025 evaluation holdout. These are displayed metadata and methodology descriptions; the repository does not include raw observation files, a data-ingestion process, or a running trained model that generates the displayed future scenarios.

## Forecast Uncertainty

Each predefined future forecast includes a central estimate and a symmetric expected range. For the default scenario:

- Forecast: **31.5°C**
- Expected range: **29.7°C–33.3°C**
- Uncertainty: **±1.8°C**

The range communicates estimated spread around the central forecast. It is not a guarantee of the observed temperature.

## Project Architecture

```text
Forecast controls
      ↓
Shared React forecast context
      ↓
Central forecast scenario definitions and selector
      ↓
Selected scenario
      ↓
Forecast cards, charts, and Overview

Historical evaluation definitions
      ↓
Evaluation dashboard

Model and dataset metadata
      ↓
Data & Model page
```

The scenario selector and date/horizon values are defined in `lib/forecast/forecast-data.ts`. `components/providers/ForecastProvider.tsx` shares the currently selected scenario across routes. Forecast controls and display components consume that state; they do not call a backend or external service.

## Getting Started

Requirements: Node.js and npm, with network access to install the dependencies listed in `package-lock.json`.

## Installation

```bash
npm install
```

## Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in a browser.

## Build

```bash
npm run build
```

## Lint

```bash
npm run lint
```

## Project Structure

```text
app/
  page.tsx                 Overview route
  forecast/page.tsx        Future forecast route
  evaluation/page.tsx      Historical evaluation route
  data-model/page.tsx      Model and data information route
  layout.tsx               Shared application layout and provider
components/
  dashboard/               Forecast cards, context, and charts
  evaluation/              Error, calibration, and case views
  forecast/                Forecast controls and workflow display
  layout/                  Header, navigation, and page container
  providers/               Shared forecast React context
  ui/                      Reusable panels and metric cards
data/                      Historical evaluation and metadata definitions
lib/
  forecast/forecast-data.ts Central deterministic future scenarios
  formatters.ts             Date and temperature formatting
  constants.ts              Application naming
types/                      Forecast, evaluation, and dataset contracts
```

## Design Principles

- Keep future forecast scenarios separate from historical observed outcomes.
- Keep scenario dates and values deterministic and centrally defined.
- Present uncertainty and a baseline alongside the point forecast.
- Make model configuration, evaluation context, and limitations visible.
- Keep the forecasting interface responsive and its controls accessible.

## Limitations

- The forecast scenarios focus on Delhi, India.
- The issue date is fixed at September 28, 2026, and only the five listed target dates are available.
- Future values are predefined; no model is run to generate them.
- The application does not retrieve current weather observations or provide a weather service.
- Future scenarios have no observed outcomes or error values.
- Evaluation metrics represent the included historical evaluation information and do not update from future scenario selections.
- The displayed dataset metadata does not mean raw data or an ingestion pipeline is included in this repository.
- Additional data validation and model evaluation would be required before operational use.

## Future Development

- Connect documented archived weather datasets with reproducible ingestion and validation.
- Train and evaluate a forecasting model using time-aware feature engineering.
- Add automated uncertainty calibration and experiment tracking.
- Expand geographic coverage.
- Integrate a forecasting service after validation and operational requirements are established.

## License

No license has currently been specified for this repository.
