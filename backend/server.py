# -*- coding: utf-8 -*-
"""
FastAPI Server for Python AI/ML Legal Inference Backend
Runs on http://localhost:8000
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from model import legal_model

app = FastAPI(
    title="NyayaAI Python ML Backend",
    description="Offline Scikit-Learn Machine Learning Service for Indian Law & BNS Inference",
    version="2.0.0"
)

# Enable CORS for React frontend (Vite dev server)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class SituationRequest(BaseModel):
    situation: str


@app.get("/")
def root():
    return {
        "service": "NyayaAI Python ML Legal Backend",
        "status": "online",
        "framework": "FastAPI + Scikit-Learn TF-IDF",
        "documentation": "/docs"
    }


@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "model_trained": legal_model.is_trained,
        "engine": "Scikit-Learn TF-IDF + LogisticRegression / MultinomialNB"
    }


@app.get("/api/diagnostics")
def run_diagnostics():
    report = legal_model.evaluate_model()
    return {
        "status": "success",
        "metrics": report
    }


@app.post("/api/predict")
def predict_situation(req: SituationRequest):
    if not req.situation or not req.situation.strip():
        raise HTTPException(status_code=400, detail="Situation text cannot be empty.")
    
    result = legal_model.predict(req.situation.strip())
    return result


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("server:app", host="127.0.0.1", port=8000, reload=False)
