## System requirements

Define funtional requirements and scope 
Define non-functional requirements
Order non-functional requirement arcoding to their importantce

## Non-funtional requirements 

### avaiability: the system uptime, percentge of time system has been working and avaiable
### scalability: the property of a system to handle a growing load
### High Availability

design principles behind high avaiability

- build redundancy to eliminate single point of failures 

- 

non-functional performance 
+ netword latency: osi model, network protocols
+ server-side latency: faster algorithms, cache, memory versus disk trade-offs, thread pools and parallel processing
+ client-side latancy: blocking versus non-blocking I/O, message format, data compression, content delivery netword, external cache

### throughput

request per second, database queries per minute, network packgets per house

higher throughput, better performance

how to increase throguhput
- decrease latency
- scale up / out

Example, we have a big tasks, we increase throughput by splitting a larger task to smaller ones and running taks in parallel (using batch processing)
Another example we have message-queue, one queue and one consumer, messages arrive at a high rate, then one consumer can be overloaded, so we increase throughput by splitting out message consumers, or we can splitting out message queuees (streaming processing)
another example, a writting database system, many write request to a database can increase latency and decrease throughput, we can sharding table to multiple-shard table, we increase throguhput using sharding(partitioning) (data store writes)
in caching system, we increase throughput using replication (data store read)
bandwidth (maximum rate of data transfer across a given path)

### durability

once data is successfully submited to the system, it is not lost
how to system achive durability?
by creating and maintaining multiple copies of data

using backup and/or replication and/or raid(?)

if all the data backup got broken, we need copy from the healthy data copies

### consistency

ACID (),
BASE,
CAP

<- weak consistency - eventual consistency - monotonic reads - read-your-write(read-after-write) - consistent prefix reds - linearizability -> strong consistency

### Maintainability

before launch                   product launch                   maintance phase 
list of best practices                                           identifying bugs and fixing them,
for archiving operational                                           adding new features, improving performance, 
excellence                                                          increasing test cover, writing document

failure and mode and mitigations

if some componnet fails, what happens to the rest of the system?
how the system handles network partitions
how we want the system to handle network partition

monitoring

how do we monitor the health of the system
in case of a system failure, how do we know what exactly is broken

testing

how to test each individual component
how to test data flow end-to-end

deployment 

how to deploy regular changes safely
how to rollback bad changes quickly

### security

identity and permission management 
who can access the system
who can access what in system
how to implement authentication and authorization in the system

infrastructure protection
is the system protected from DDos attack,
is it protected from other common attack, such as SQL injection or xss
should we use a web applicaiton firewall or an API gateway to implement protected

### cost 
total cost = engineering cose(design, implementation, testing, deploy) + maintaince cost (how to reduce? automation) + resources cose (hardware, software)

resources cost = physical machines, hardware load balancer devices, networking devices
software cost = cloud software, in-house

## how to achive certain system qualities with the help of hardware

### regions, avaiability zones, data centers, racks, server

we deploy a copy of the system to every region worldwide
improve performcance - the system is physically closer to user
increases avaiability - we can forward request to other regions
improves scalability - more hardware is avaiable for allocation

we deploy the system to servers in each avaiability  zone
increases durability - we can replicate data quickly between zones
with each data centerm we deploy to server in diferent racks
we choose the server type bases on the workload it expects to run

### physical server, virtual machines, container, serverless

- physical server

app1
bin/linbs
host operating system
hardware

props: gives complete control of its software stack and hardware resources
has a lot of processing power
provider isolation between tenants
eliminates the noise neighbor phenomenon
offer high security

cons: expensive
hard to manage
hard to scale
hard to port 
slow to provision and boot

good for: when we need highly productive hardware to run our application(data-intensive workloads) when we need to meet complex corporate security, compliance, and regulaatory requirements.

serverless
- no server to provision, manage upgrade
- we only pay for the compute time we consume
- automated scaling based on the load
- increased delivery speed.
cons:
technical limitation
can be expensive when operating at sacle

## fundamental of reliable, scalable, fast communacation

## how to improve performance with caching

deduplicattion cache

local cahce (private): nó lưu tại host(server)
nó simple và nhanh nhưng không scale vì ram bị giới hạn, khả năng chịu lỗi là bằng không

external cache (shared, remote): lưu cache tại một server khác
saclable (tổng sức chứa là bao gồm nhiều sever cộng lại)
khả năng chịu lỗi và durable(nếu hỗ trợ replication)
nhưng tốn công maintaince

cách data bị trục xuất khỏi cache
phụ thuôjc vào chính sách:
Đã lâu, ít không sử dụng (Leát Rêcntly used), hoặc không sử dụng thường xuyên (Least Frequently Used)

trục xuất theo thời gian: bị động (set time khi thêm vào cache), actvie (chạy background interval để check)

hoặc xoá một cách ràng: cache.invalidate(key)

### metadata cache

cache-aside pattern

read-through pattern

write-through pattern

write-back pattenr

## queue in 

## how to delivery data quickly

### bathcing 


### comression

## how to proteced server from client

metrics -based 
check xem nếu CPU > 80% thì scale out, còn < 40% thì scale in

lập lịch
scale out trong giờ làm việc
scale in night và on weekend

dự đoán bao nhiêu % cpu thì scale

### auto scaling

