FROM python:3.10-slim-buster


WORKDIR /Crud

COPY . .

RUN pip install -r requirements.txt

CMD ["python3", "app.py", "--host=0.0.0.0", "--port=5000"]