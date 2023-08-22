FROM python:3.8

COPY . /app
WORKDIR /app

ENV FLASK_APP app.py
ENV PYTHONPATH .

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

CMD [ "python","app.py" ]