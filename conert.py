import pandas as pd
import mammoth

# Convert the Word document to plain text
doc_path = 'countdouwn.docx'
with open(doc_path, "rb") as docx_file:
    result = mammoth.extract_raw_text(docx_file)
    text = result.value

# Initialize variables
data = []
current_activity_topic = None
current_activity = None

# Process the lines
lines = text.split('\n')
buffer = []

def process_buffer(buffer):
    global current_activity, current_activity_topic
    if not buffer:
        return
    if buffer[0].lower() == 'next activity topic name':
        current_activity_topic = f'Activity Topic {len(data) + 1}'
        print(f'Found a new activity topic: {current_activity_topic}')
    elif len(buffer) >= 5:
        current_activity = {
            'activity_topic': current_activity_topic,
            'hr': buffer[0],
            'min': buffer[1],
            'sec': buffer[2],
            'event_number': buffer[3],
            'activity_name': buffer[4],
            'confirmation_by': buffer[5] if len(buffer) > 5 else '',
            'status': False
        }
        data.append(current_activity)
    elif current_activity and len(buffer) >= 1:
        sub_event = {
            'activity_topic': current_activity_topic,
            'hr': current_activity['hr'],
            'min': current_activity['min'],
            'sec': current_activity['sec'],
            'event_number': buffer[0],
            'activity_name': buffer[1] if len(buffer) > 1 else '',
            'confirmation_by': buffer[2] if len(buffer) > 2 else '',
            'status': False
        }
        data.append(sub_event)

for line in lines:
    line = line.strip()
    if not line:
        process_buffer(buffer)
        buffer = []
    else:
        buffer.append(line)

# Process the remaining buffer
process_buffer(buffer)

# Convert to DataFrame
df = pd.DataFrame(data)

# Save to CSV
csv_path = 'Extracted_Activities.csv'
df.to_csv(csv_path, index=False)
print(f'Data extracted and saved to {csv_path}')
